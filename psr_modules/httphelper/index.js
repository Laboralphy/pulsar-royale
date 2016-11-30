/**
 * O876 HTTP HELPER
 * Server HTTP pour node.js
 * @author Raphaël Marandet
 * @date 2014-02-01
 */

var http = require('http');
var url = require('url');
var oMimes = require('mime-types').types;
var fs = require('fs');
var queryString = require('querystring');


var oHttpServer = null;		// instance du serveur http
var nHttpPort = 80;		// port d'écoute
var sWwwPath = 'www';	// chemin de la racine des sites web
var sIndexFile = 'index.html';

var pRequestHook = null;
var nMaxPostDataLength = 1e6;

// commandes internes : initialement : date
var oCommands = {
	date: function(r) {
		var d = new Date();
		r.setHeader('Content-Type', 'text/plain');
		r.end(d.toString());
	}
};

/**
 * Envoie une chaine de caractère en Log STDOUT 
 * @params éléments à afficher
 */
function cLog() {
	var aParams = Array.prototype.slice.call(arguments, 0);
	aParams.unshift('[' + (new Date()).toJSON() + ']');
	console.log(aParams.join(' '));
}

/**
 * Envoie une chaine de caractère en Log STDERR 
 * @params éléments à afficher
 */
function cError() {
	var aParams = Array.prototype.slice.call(arguments, 0);
	aParams.unshift('[' + (new Date()).toJSON() + ']');
	console.error(aParams.join(' '));
}

/**
 * Permet d'envoyer une requete GET à un server
 * @param sURL url à taper.
 * @param pCallback fonction appelée lorsque le serveur aura répondu à la requète
 * @param oHeaders objet contenant les header à transmettre au serveur (cookies...)
 */
function wget(sURL, pCallback, oHeaders) {
	var oParse = url.parse(sURL);
	var oOptions = {
		host: oParse.hostname,
		port: oParse.port,
		path: oParse.path
	};
	if (oHeaders !== undefined) {
		oOptions.headers = oHeaders;
	}
	var oRequest = http.get(oOptions, function(oResponse) {
		var sData = '';
		
		oResponse.on('data', function(chunk) {
			sData += chunk;
		});
		
		oResponse.on('end', function() {
			pCallback(null, sData);
		});
	});
	
	oRequest.on('error', function(err) {
		pCallback(err, '');
	});
} 

/**
 * obtention du type mime d'un fichier par rapport à son type
 * @param string sFile nom du fichier
 * @return string type mime correspondant au fichier
 */ 
function httpGetMime(sFile) {
	var aExt = sFile.match(/\.[^\.$]+$/);
	var sExt = '';
	if (aExt && aExt.length) {
		sExt = aExt[0].substr(1).toLowerCase();
	}
	if (sExt in oMimes) {
		return oMimes[sExt];
	}
	return 'application/octet-stream';
}

/**
 * Renvoie l'encodage du fichier (binaire ou utf8)
 * @param string sFile nom du fichier
 * @return string encodage (null pour binaire)
 */
function httpGetEncoding(sFile) {
	var sMime = httpGetMime(sFile);
	var aMime = sMime.split('/');
	var bText = aMime[0] === 'text';	
	return bText ? 'utf8' : null;
}

/**
 * Si l'url correspond à une commande interne lance la commande interne
 * @param string sURL url
 * @param HTTPResponse oResponse objet recueillant la réponse à renvoyer au client
 * @return bool vrai si l'url correspond à une commande interne
 */  
function httpCommand(oRequest, oResponse, oPostData) {
	var oParse = url.parse(oRequest.url, true, true);
	var sCommand = oParse.pathname.replace(/\//g, '_').replace(/^_/, '').replace(/_$/, '');
	if (sCommand in oCommands) {
		oCommands[sCommand](oResponse, oParse.query);
		return true;
	} else {
		return false;
	}
}


/**
 * Renvoie une erreur HTTP (genre 404)
 * @param int nError numero erreur HTTP
 * @param string sDetail détails de l'erreur en texte
 * @param oResponse objet réponse à utiliser
 */
function httpError(nError, sDetail, oResponse) {
	oResponse.statusCode = nError;
	var sMessage = nError.toString() + ' - ';
	switch (nError) {
		case 403:
			sMessage += 'Forbidden : ' + sDetail;
			break;
			
		case 404:
			sMessage += 'Not found : ' + sDetail;
			break;
	}
	cError('http error', sMessage);
	oResponse.end(sMessage);
}


/**
 * Si l'url correspond à un fichier présent sur disque : 
 * on transmet le fichier tel quel
 * @param string sFile nom du fichier
 * @param HTTPResponse oResponse objet recueillant la réponse à renvoyer au client
 * @return bool vrai si le fichier est présent sur le disque
 */
function httpTransmitFile(oRequest, oResponse, pPreprocess) {
	var oParse = url.parse(oRequest.url);
	var sFile = oParse.pathname;
	var sPathFile = sWwwPath + (sFile.charAt(0) != '/' ? '/' : '') + sFile;
	var pReadFile = null;
	var oHeader;
	pReadFile = function(e, sData) {
		if (e) { // on peut pas ouvrir le fichier
			fs.stat(sPathFile, function(e2, oStats) {
				if (e2) {
					// file not found
					httpError(404, sFile, oResponse);
				} else 	if (oStats.isDirectory()) {
					// transmettre un header de movage permanently
					if (sPathFile.substr(-1) != '/') {
						oHeader = {};
						oHeader['Location'] = sFile + '/';
						oHeader['Connection'] = 'close';
						oHeader['Content-Type'] = 'text/html';
						oResponse.writeHeader(301, oHeader);
						oResponse.end();
					} else {
						sPathFile += sIndexFile;
						fs.readFile(sPathFile, {encoding: httpGetEncoding(sIndexFile)}, pReadFile);
					}
				} else {
					// le fichier n'est pas un répertoire, n'a pas généré d'erreur stat mais n'a pas pu être lu quand même
					// ca doit etre une erreur de permission
					httpError(403, sFile, oResponse);
				}
			});
		} else {
			if ('range' in oRequest.headers) {
				// partial content request
				oHeader = {};
				var sRange = oRequest.headers.range;
				var aParts = sRange.replace(/bytes=/, '').split('-');
				var sPartialStart = aParts[0];
				var sPartialEnd = aParts[1];
				var nTotal = sData.length;
				var nStart = parseInt(sPartialStart, 10);
				var nEnd = sPartialEnd !== '' ? parseInt(sPartialEnd, 10) : nTotal - 1;
				oHeader['Content-Type'] = httpGetMime(sPathFile);
				oHeader['Content-Range'] = 'bytes ' + nStart + '-' + nEnd + '/' + (nTotal);
				oHeader['Accept-Ranges'] = 'bytes';
				oHeader['Content-Length'] = (nEnd - nStart) + 1;
				oHeader['Connection'] = 'close';
				oResponse.writeHeader(206, oHeader);
				oResponse.write(sData.slice(nStart, nEnd + 1), 'binary');
				oResponse.end();
				return true;
			} else {
				if (sPathFile.substr(-1) == '/') {
					sPathFile += sIndexFile;
				}
				oResponse.setHeader('Content-Type', httpGetMime(sPathFile));
				if (pPreprocess) {
					sData = pPreprocess(sData);
				}
				oResponse.end(sData);
			}
		}
	};
	fs.readFile(sPathFile, {encoding: httpGetEncoding(sFile)}, pReadFile);
	return true;
}

/**
 * Analyse des données POST
 * @param oRequest
 * @param oResponse
 * @param pCallBack function appelée lorsque les données sont transmises
 */
function httpGetPostData(oRequest, oResponse, pCallBack) {
	var sBody = '';
	oRequest.on('data', function(sData) {
		sBody += sData;
		if (sBody.length > nMaxPostDataLength) {
			oRequest.connection.destroy();
		}
	});
	oRequest.on('end', function() {
		var oPost = queryString.parse(sBody);
		if (pCallBack) {
			pCallBack(oRequest, oResponse, oPost);
		}
	});
}


/**
 * Lance le process de traitement de requete
 * Si la requete est de methode POST alors on analyse les données post en asynchrone.
 * @param oRequest
 * @param oResponse
 * @param oPostData
 */
function httpProcess(oRequest, oResponse, oPostData) {
	if (pRequestHook) {
		if (pRequestHook(oRequest, oResponse, oPostData)) {
			return;
		}
	}
	if (httpCommand(oRequest, oResponse, oPostData)) {
		return;
	}
	httpTransmitFile(oRequest, oResponse);
}


/**
 * fonction callback d'écoute d'une requête
 * @param oRequest requête client
 * @param oResponse objet réponse qui sera transmis au client.
 */
function httpListen(oRequest, oResponse) {
	if (oRequest.method === 'POST') {
		httpGetPostData(oRequest, oResponse, httpProcess);
	} else {
		httpProcess(oRequest, oResponse);
	}
}

/**
 * création du serveur et mise en ecoute
 */
function httpCreateServer() {
	oHttpServer = http.createServer(httpListen);
	oHttpServer.listen(nHttpPort);
}


/**
 * Envoie d'une requete post sur un autre serveur http
 * @param sURL url à taper
 * @param sData contenu des données post à envoyer (si c'est un objet , l'objet est sérialisé en json)
 * @param pCallback fonction callback appelée au retour de la réponse serveur
 */
function httpPost(sURL, sData, pCallback) {
	var oURL = url.parse(sURL);

	var oPostOptions = {
		host: oURL.host,
		port: oURL.port,
		path: oURL.path,
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			'Content-Length': sData.length,
		}
	};
	
	var oPostReq = http.request(oPostOptions, function(res) {
		res.setEncoding('utf8');
		var sChunk = '';
		res.on('data', function(chunck) {
			sChunk += chunck;
		});
		res.on('end', function() {
			if (pCallback) {
				pCallback(sChunk);
			}
		});
	});

	oPostReq.write(typeof sData === 'string' ? sData : JSON.stringify(sData));
	oPostReq.end();
}

module.exports = {
	/**
	 * Lance le serveur à l'écoute sur un port spécifié en paramètre
	 * @param nPort numero du port
	 */
	run: function(nPort) {
		nHttpPort = nPort;
		httpCreateServer();
	},

	/**
	 * Définition d'une nouvelle commande du serveur
	 * une commande de serveur sera disponible à l'url
	 * http://hote:port/commande/param1/param2
	 * @param sCommand alias de la commande
	 * @param pFunction fonction qui sera appelée.
	 * le premier paramètre de la fonction sera le ServerResponse les autres paramètres de cette fonction 
	 * seront ceux passé dans l'url (séparé par des /)
	 * exemple : http:://monserveur:80/macommande/monparam/45/monautreparam/abc/
	 * va lancer la commande défini sous l'alias "macommande" : macomande(oResponse, {monparam: 45, monautreparam: 'abc'});
	 */
	defineCommand: function(sCommand, pFunction) {
		oCommands[sCommand] = pFunction;
	},

	/**
	 * Définit une fonction hook qui intervient juste avant le traitement d'une URL
	 * @param f function hook (oRequest, oResponse)
	 */
	setRequestHook: function(f) {
		pRequestHook = f;
	},

	/** 
	 * Définit le document root du serveur
	 * @param sRoot nouveau document root
	 */
	setDocumentRoot: function(sRoot) {
		sWwwPath = sRoot;
	},

	/**
	 * Renvoi la valeur du document root
	 * @return string
	 */
	getDocumentRoot: function(sRoot) {
		return sWwwPath;
	},

	/**
	 * Récupère l'instance du serveur (pour une interaction avec socket.io par exemple
	 * @return Server
 	 */
	getServer: function() {
		return oHttpServer;
	},
	
	/**
	 * ouverture et transmission d'un fichier désigné par l'url passée en paramètre
	 * @param string sFile nom du fichier
	 * @param HTTPResponse oResponse objet recueillant la réponse à renvoyer au client
	 * @param pPreprocess function callback appelée lorsque les donnée sont arrivée
	 * Permet d'appliquer des modification à la volée des donénes
	 * function(sData) { .... return string }
	 * Cette fonction si elle est définie doit renvoyée les donnée modifiée.
	 * @return bool vrai si le fichier est présent sur le disque
	 */
	transmitFile: function(sFile, oResponse, pPreprocess) {
		return httpTransmitFile({url: sFile, headers: {}}, oResponse, pPreprocess);
	},

	/**
	 * Envoie une chaine de caractère en Log STDOUT 
	 * @params éléments à afficher
	 */
	writeLog: cLog,
	
	/**
	 * Envoie une chaine de caractère en Log STDERR 
	 * @params éléments à afficher
	 */
	writeError: cError,

	/**
	 * Permet d'envoyer une requete GET à un server
	 * @param sURL url à taper.
	 * @param pCallback fonction appelée lorsque le serveur aura répondu à la requète
	 * @param oHeaders objet contenant les headers à transmettre au serveur (cookies...)
	 */
	wget: wget,
	
	/**
	 * Envoi d'une requete post à un serveur
	 */
	wpost: httpPost
};
