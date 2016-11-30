var io = require('socket.io');
var http = require('httphelper');



////// WEB SOCKET SERVER ZONE ////// WEB SOCKET SERVER ZONE //////
////// WEB SOCKET SERVER ZONE ////// WEB SOCKET SERVER ZONE //////
////// WEB SOCKET SERVER ZONE ////// WEB SOCKET SERVER ZONE //////

var oWSServer;
var aServices = null;
var oSocketRegistry = null;
var nServerTimestamp;


/**
 * Envoi un message à tous les clients
 * @param sMessage code message
 * @param xData contenu des données
 */
function wsSendToAll(sMessage, xData) {
	oWSServer.sockets.emit(sMessage, xData);
}

/**
 * Envoi un message à certains client
 * @param aSockets array of Sockets : liste des sockets à servir
 * @param sMessage code message
 * @param xData contenu des données
 */
function wsSendToSome(aSockets, sMessage, xData) {
	if (!aSockets) {
		return;
	}
	var nLen = aSockets.length;
	for (var i = 0; i < nLen; ++i) {
		if (aSockets[i]) {
			aSockets[i].emit(sMessage, xData);
		}
	}
}


/**
 * Vérifie que la socket à bien été crée lors de cette session
 */
function wsCheckSocketSession(oSocket) {
	return wsGetData(oSocket, '__serverTimestamp') == nServerTimestamp;
}


/**
 * Démarrage du server web socket
 * @param oServer instance de serveur HTTP
 */
function wsInit(oServer) {
	oSocketRegistry = {};
	aServices = [];
	nServerTimestamp = Date.now();
	oWSServer = io.listen(oServer, {log: false});
	oWSServer.use(function(oSocket, next) {
		if ('__data' in oSocket) {
			throw new Error('websocket storage namespace conflict');
		}
		oSocket.__data = {
			__serverTimestamp: nServerTimestamp
		};
		next();
	});
}

function wsAddService(pService) {
	aServices.push(pService);
}

/**
 * Définition et démarrage du service
 * Le service est une fonction callback qui sera
 * lancée a chaque connexion d'un client.
 * à charge de cette fopnctiopn de déclarer les message du protocole
 */
function wsStartService() {
	oWSServer.sockets.on('connection', function(oSocket) {
		aServices.forEach(function (s) {
			s(oSocket);
		});
	});
}

/**
 * Virer tous les clients connectés
 */
function wsWipe() {
	oWSServer.sockets.clients().forEach(function(s) {
		s.disconnect();
	});
	oSocketRegistry = {};
}

/**
 * Récupérer une donnée associée à la socket
 * @param Socket oSocket
 * @param string sVariable nom de la variable
 * @return any valeur de la variable
 */
function wsGetData(oSocket, sVariable) {
	return oSocket.__data[sVariable];
}

/**
 * Associer une variable à la socket
 * @param Socket oSocket
 * @param string sVariable nom de la variable
 * @param any xValue valeur de la variable
 */
function wsSetData(oSocket, sVariable, xValue) {
	oSocket.__data[sVariable] = xValue;
}

/**
 * Récupérer l'adresse d'une socket
 * @param Socket oSocket
 * @return string adresse ip
 */
function wsGetAddress(oSocket) {
	// Retro compat avec socket.io 0.9 
	var oAddr = oSocket.handshake;
	if (typeof oAddr.address === 'object') {
		return oAddr.address.address;
	} else {
		return oAddr.address;
	}
}

function wsSetSocketId(oSocket, id) {
	wsSetData(oSocket, '__client_id', id);
	http.writeLog('[Socket] registering #' + id);
	oSocketRegistry[id] = oSocket;
	oSocket.on('disconnect', function() {
		if (wsCheckSocketSession(oSocket)) {
			http.writeLog('[Socket] closing #' + id);
			delete oSocketRegistry[id];
		} else {
			http.writeLog('[Socket] ghost socket #' + id);
		}
	});
}

function wsGetSocket(id) {
	if (id in oSocketRegistry) {
		return oSocketRegistry[id];
	} else {
		return null;
	}
}

function wsGetSocketId(oSocket) {
	return wsGetData(oSocket, '__client_id');
}

module.exports = {
	init: wsInit,
	addService: wsAddService,
	start: wsStartService,
	send: wsSendToSome,
	sendToAll: wsSendToAll,
	wipe: wsWipe,
	getData: wsGetData,
	setData: wsSetData,
	getAddress: wsGetAddress,
	checkSession: wsCheckSocketSession,
	setSocketId: wsSetSocketId,
	getSocketId: wsGetSocketId,
	getSocket: wsGetSocket,
};
