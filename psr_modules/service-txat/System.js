"use strict"
var User = require('./User.js');
var Channel = require('./Channel.js');
var Recycler = require('./Recycler.js');
var Mediator = require('mediator');
var Plugins = require('object-loader')(__dirname + '/txat-plugins');
var Emitter = require('events');

class TxatSystem {
	constructor() {
		this.aChannels = [];
		this.aUsers = [];
		this.oChannelRecycler = new Recycler();
		this.oUserRecycler = new Recycler();
		this.oMediator = null;
		this.oConfig = null;
		this.oChannelRegistry = {};
		this.oUserRegistry = {};
		this.oEmitter = new Emitter();
	}
	
	get emitter() {
		return this.oEmitter;
	}

	
	configure(oConfig) {
		// plugins
		this.initPlugins(Plugins, oConfig.plugins);
		// canaux
		for (var sChannel in oConfig.channels) {
			this.createChannel(sChannel);
		}
	}
	
	
	/// WEBSOCKET EVENTS DECLARATION ///
	/// WEBSOCKET EVENTS DECLARATION ///
	/// WEBSOCKET EVENTS DECLARATION ///



	
	/**
	 * Initialisation du système de plugin
	 * @param array aPlugins liste des plugin
	 */
	initPlugins(oPlugins, oConfig) {
		var m = new Mediator.Mediator();
		m.setApplication(this);
		var P, p;
		for (var sPlugin in oPlugins) {
			P = oPlugins[sPlugin];
			p = new P();
			m.addPlugin(p);
		}
		this.oMediator = m;
		Object.keys(oPlugins).forEach(function(s) {
			m.sendSignal('config' + s, oConfig[s]);
		});
	}
	
	/**
	 * Envoi un signal à tous les plugin abonné à ce signal
	 * @param string Signal
	 * @param others...
	 */
	sendSignal() {
		var m = this.oMediator;
		m.sendSignal.apply(m, arguments);
		this.doNotify.apply(this, arguments);
	}
	
	/**
	 * Renvoie l'objet utilisateur correspondant à l'identifiant spécifié
	 * @param int id identifiant utilisteur
	 * @return User
	 */
	getUser(id) {
		var oUser;
		if (this.aUsers[id]) {
			oUser = this.aUsers[id];
			return oUser;
		} else {
			throw new Error('User #' + id + ' not found');
		} 
	}
	
	
	/**
	 * Retrouve l'identifiant d'un canal
	 * @param string sName nom du canal
	 * @return int
	 */
	getUserId(sName) {
		if (sName in this.oUserRegistry) {
			return this.oUserRegistry[sName];
		} else {
			throw new Error('User "' + sName + '" not connected');
		}
	}
	/**
	 * Renvoie l'objet canal correspondant à l'identifiant spécifié
	 * @param int id identifiant canal
	 * @return Channel
	 */
	getChannel(id) {
		var oChan;
		if (this.aChannels[id]) {
			oChan = this.aChannels[id];
			return oChan;
		} else {
			throw new Error('Channel #' + id + ' not found');
		} 
	}
	
	/**
	 * Retrouve l'identifiant d'un canal
	 * @param string sName nom du canal
	 * @return int
	 */
	getChannelId(sName) {
		if (sName in this.oChannelRegistry) {
			return this.oChannelRegistry[sName];
		} else {
			throw new Error('Channel "' + sName + '" not found');
		}
	}
	
	/**
	 * Procedure de creation d'un nouveau canal de discussion
	 * @return Channel canal créé
	 */
	createChannel(sName) {
		if (sName === undefined) {
			throw new Error('Undefined channel name');
		} else {
			var oChan = new Channel();
			oChan.id = this.oChannelRecycler.getId();
			oChan.setName(sName);
			this.aChannels[oChan.id] = oChan;
			this.oChannelRegistry[sName] = oChan.id;
			this.sendSignal('channelCreated', oChan);
			return oChan;
		}
	}
	
	/**
	 * Procedure de destruction finale d'un canal de discussion
	 * @param int id canal à détruire
	 */
	dropChannel(id) {
		if (this.aChannels[id]) {
			this.sendSignal('channelDestroyed', this.aChannels[id]);
			delete this.oChannelRegistry[this.aChannels[id].sName];
		}
		this.aChannels[id] = undefined;
		this.oChannelRecycler.disposeId(id);
	}
	
	/**
	 * Renvoie la liste des noms des canaux ouverts
	 * @return array
	 */
	getChannels() {
		return this.aChannels.filter(function(i, n, a) {
			return !!i;
		}).map(function(i, n, a) {
			return i.getName();
		});
	}
	
	checkUserLoginName(sLoginName) {
		if (sLoginName.length < 3) {
			throw new Error('User name must be 3 or more character length');
		}
		var sForbidden = ' ><;&/\\="@';
		if (sForbidden.split('').some(function(c) {
			return sLoginName.indexOf(c) >= 0;
		})) {
			throw new Error('Illegal character in user name');
		}
		if (!this.aUsers.every(function(i, n, a) {
			if (i) {
				return i.sName != sLoginName;
			} else {
				return true;
			}
		})) {
			throw new Error('This user name "' + sLoginName + '" is already in use');
		}
	}
	
	/**
	 * Procedure de creation d'utilisateur au systeme
	 * L'utilisateur identifié se connecte au systeme
	 */ 
	createUser(sLoginName, id) {
		var oUser = new User();
		oUser.id = id;
		oUser.sDisplayName = oUser.sName = sLoginName;
		this.aUsers[id] = oUser;
		this.oUserRegistry[sLoginName] = id;
		this.sendSignal('userConnected', oUser);
		return oUser;
	}
	
	/**
	 * Procedure de destruction finale d'un utilisateur
	 * @param int id canal à détruire
	 */
	dropUser(id) {
		var oUser = this.aUsers[id];
		this.removeUserFromAllChannels(id);
		this.sendSignal('userDisconnected', oUser);
		delete this.oUserRegistry[oUser.sName];
		this.aUsers[id] = undefined;
		this.oUserRecycler.disposeId(id);
	}
	
	/**
	 * Connecte un utilisateur au canal de discussion
	 * L'utilisateur recois les droits standard sauf si le canal ne
	 * contient aucun utilisateur
	 * @param int idUser identifiant user
	 * @param int idChannel identifiant canal
	 * @return bool true si tout s'est bien passé
	 */
	addUserToChannel(idUser,idChannel) {
		var oChan = this.getChannel(idChannel);
		var oUser = this.getUser(idUser);
		if (oChan.addUser(oUser)) {
			this.sendSignal('userJoined', oChan, oUser);
		} else {
			this.sendSignal('userAccessDenied', oChan, oUser);
		}
	}
	
	/**
	 * Retire un utilisateur du canal spécifié
	 * soit qu'il a décider de quitter le calnal
	 * soit qu'il en est été ejecté
	 * @param int idUser identifiant user
	 * @param int idChannel identifiant canal
	 * @return bool true si tout s'est bien passé
	 * un false peut subvenir si les identifiant sont mal foutus
	 */
	removeUserFromChannel(idUser, idChannel) {
		var oChan = this.getChannel(idChannel);
		var oUser = this.getUser(idUser);
		this.sendSignal('userLeft', oChan, oUser);
		oChan.removeUser(oUser);
		var aChanUsers = oChan.getUserList();
		var oNewAdmin;
		var nCount = oChan.getUserCount();
		if (!aChanUsers.some((function(u) {
			return this.getUser(u).oPowers[idChannel].nLevel >= 2;
		}).bind(this))) {
			// il ne reste plus d'admin
			if (nCount) {
				oNewAdmin = this.getUser(aChanUsers[0]);
				oNewAdmin.grantPowers(idChannel, true);
				this.sendSignal('newAdmin', oChan, oNewAdmin);
			}
		}			
		if ((!oChan.bPermanent) && (nCount == 0)) {
			this.dropChannel(idChannel);
		}
	}

	/**
	 * Retire l'utilisateur de tous les canaux auquel il est connecté
	 * @param int idUser utilisateur
	 */
	removeUserFromAllChannels(idUser) {
		var oUser = this.getUser(idUser);
		var aChannels = oUser.getChannelList();
		var nChannelCount = aChannels.length;
		for (var i = 0; i < nChannelCount; ++i) {
			this.removeUserFromChannel(idUser, aChannels[i]);
		}
	}
	
	/**
	 * Bannissement d'un joueur du canal,
	 * Le joueur doit être présent sur le canal.
	 * @param idBanned int idUser identifiant user
	 * @param idChannel canal concerné
	 * @param nTime nombre de minutes de bannissments
	 * @param sWhy raison du banissement
	 * @param idJudge identifiant du bannisseur
	 */
	banUserFromChannel(idBanned, idChannel, nTime, sWhy, idJudge) {
		if (nTime) {
			nTime = nTime * 60000 + Date.now();
		}
		var oBanned = this.getUser(idBanned);
		var oJudge = this.getUser(idJudge);
		var oChan = this.getChannel(idChannel);
		var oPowBanned;
		var oPowJudge;
		if ((idChannel in oBanned.oPowers) && (idChannel in oJudge.oPowers)) {
			oPowBanned = oBanned.oPowers[idChannel];
			oPowJudge = oJudge.oPowers[idChannel];
			if (oPowJudge.bBan && oPowJudge.nLevel > oPowBanned.nLevel) {
				// judge can ban user
				oChan.addUserToBlackList(oBanned.sName, nTime, sWhy);
				this.sendSignal('userBanned', oChan, oBanned, nTime, sWhy, oJudge);
				this.removeUserFromChannel(idBanned, idChannel);
			} else {
				throw new Error('This user cannot be banned (insufficient powers)');
			}
		} else {
			throw new Error('This user cannot be banned (not in the channel)');
		}
	}
	
	/**
	 * Annule le bannisssmeent d'une utilisateur
	 * @param idBanned int idUser identifiant user banni
	 * @param idChannel canal concerné
	 * @param idJudge identifiant du moderator qui tente le dé-banissement
	 */
	unbanUserFromChannel(idBanned, idChannel, idJudge) {
		var oBanned = this.getUser(idBanned);
		var oJudge = this.getUser(idJudge);
		var oChan = this.getChannel(idChannel);
		var oPowBanned;
		var oPowJudge;
		if (idChannel in oJudge.oPowers) {
			oPowJudge = oJudge.oPowers[idChannel];
			if (oPowJudge.bUnban) {
				// judge can unban user
				oChan.removeUserFromBlackList(oBanned.sName);
			} else {
				throw new Error('This user cannot be unbanned (insufficient powers)');
			}
		} else {
			throw new Error('This user cannot be unbanned (weird error)');
		}
	}
	
	promoteUser(idChannel, idPadawan, idJedi, n) {
		if (n === undefined) {
			n = 1;
		}
		var oPadawan = this.getUser(idPadawan);
		var oJedi = this.getUser(idJedi);
		var oChannel = this.getChannel(idChannel);
		if ((idChannel in oJedi.oPowers) && (idChannel in oPadawan.oPowers)) {
			oPowJedi = oJedi.oPowers[idChannel];
			oPowPadawan = oPadawan.oPowers[idChannel];
			if (n > 0) {
				if (oPowJedi.promote(oPowPadawan)) {
					this.sendSignal('userPromote', oChannel, oPadawan);
				} else {
					throw new Error('You can not promote (insufficient powers)');
				}
			} else if (n < 0) {
				if (oPowJedi.demote(oPowPadawan)) {
					this.sendSignal('userDemote', oChannel, oPadawan);
				} else {
					throw new Error('You can not demote (insufficient powers)');
				}
			}
		} else {
			throw new Error('You can not promote/demote (channel mismatch)');
		}
	}
	
	demoteUser(idChannel, idPadawan, idJedi) {
		this.promoteUser(idChannel, idPadawan, idJedi, -1);
	}
	
	/**
	 * Renvoie la liste des utilisateur (leur nom de login)
	 * @param int idChannel identifiant du canal qu'on souhaite interroger
	 * @return array of string
	 */
	getChannelUserList(idChannel) {
		return this.getChannel(idChannel).getUserList();
	}
	
	/**
	 * Renvoie la liste des cannaux accessible pour l'utilisateur spécifié
	 * @param int idUser identifiant utilisateur
	 * @return array of string
	 */
	getUserAccessibleChannels(idUser) {
		var sUser = this.getUser(idUser).sName;
		return this.aChannels.filter(function(oChannel, n, a) {
			if (oChannel) {
				return oChannel.isPublic() && oChannel.isUserAccessGranted(sUser);
			} else {
				return false;
			}
		}).map(function(oChannel, n, a) {
			return oChannel.sName;
		}).sort(function(a, b) {
			if (a > b) {
				return 1;
			} else if (a == b) {
				return 0;
			} else {
				return -1;
			}
		});
	}
	
	
	/**
	 * Envoie une notification à tous les utilisateur d'un canal
	 * @param int idChannel
	 * @param string sMessage
	 * @param object xData
	 */
	notifyChannelUsers(idChannel, sMessage, xData) {
		var aUsers = this.getChannelUserList(idChannel);
		var nUserCount = aUsers.length;
		var oUserDst;
		var oChannel = this.getChannel(idChannel);
		for (var i = 0; i < nUserCount; ++i) {
			oUserDst = this.getUser(aUsers[i]);
			this.doNotify(sMessage, xData);
		}
	}
	
	/**
	 * Connection d'un user à un canal
	 * il doit recevoir la liste des client déja connectés
	 * si le canal est inexsitant : le créer
	 */
	userJoinsChannel(uid, sChannel) {
		var cid;
		try {
			cid = this.getChannelId(sChannel);
		} catch (e) {
			// pas de canal : creation d'un canal utilisateur
			var oChannel = this.createChannel(sChannel);
			oChannel.bPermanent = false;
			cid = oChannel.id;
		}
		this.addUserToChannel(uid, cid);
		// Lui indiquer la liste des utilisateurs
		var aUsers = this.getChannelUserList(cid).map((function(i) {
			return this.getUser(i).sName;
		}).bind(this));
		this.sendSignal('userList', this.getUser(uid), this.getChannel(cid), aUsers);
	}

	
	/**
	 * Envoie un message à un canal de discussion
	 * Tous les utilisateurs recevront le message
	 * s'ils ont le pouvoir 'read' activé.
	 * @param int idUser identifiant utilisateur qui a envoyé le message
	 * @param int idChannel identifiant du canal
	 * @param string sMessage contenu du message
	 * @return bool true si le message à été envoyé . false = l'utilisateur n'a pas le droit de causer
	 */
	sendMessageToChannel(idUser, idChannel, sMessage) {
		var oUser = this.getUser(idUser);
		if (!oUser.oPowers[idChannel]) {
			throw new Error('User sent message to a non-joined channel');
		}
		if (!oUser.oPowers[idChannel].bSend) {
			return false;
		}
		var aUsers = this.getChannelUserList(idChannel);
		var nUserCount = aUsers.length;
		var oUserDst;
		var oChannel = this.getChannel(idChannel);
		var oMsgContext = {
			message: sMessage,
			channel: oChannel,
			user: oUser
		};
		this.sendSignal('message', oMsgContext);
		sMessage = oMsgContext.message;
		oChannel = oMsgContext.channel;
		oUser = oMsgContext.user;
		delete oMsgContext.message;
		delete oMsgContext.channel;
		delete oMsgContext.user;
		for (var i = 0; i < nUserCount; ++i) {
			oUserDst = this.getUser(aUsers[i]);
			if (oUserDst.oPowers[idChannel].bReceive) {
				this.doMessage(sMessage, oChannel, oUser, oUserDst, oMsgContext);
			}
		}
	}
	
	sendMessageToUser(idUserSrc, idUserDst, sMessage) {
		var oUserSrc = this.getUser(idUserSrc);
		var oUserDst = this.getUser(idUserDst);
		var oMsgContext = {
			message: sMessage,
			channel: null,
			userexp: oUserSrc,
			userdest: oUserDst
		};
		this.sendSignal('message', oMsgContext);
		sMessage = oMsgContext.message;
		oChannel = oMsgContext.channel;
		oUserSrc = oMsgContext.userexp;
		oUserDst = oMsgContext.userdest;
		delete oMsgContext.message;
		delete oMsgContext.channel;
		delete oMsgContext.userexp;
		delete oMsgContext.userdest;
		this.doMessage(sMessage, null, oUserSrc, oUserDst, oMsgContext);
	}
	
	/**
	 * Transmission d'un message à un utilisateur
	 */
	doMessage(sMessage, oFromChannel, oFromUser, oToUser, oExtraData) {
		this.oEmitter.emit('message', sMessage, oFromChannel, oFromUser, oToUser, oExtraData);
	}
	
	/**
	 * Transmission d'une notification à un utilisateur (concernant un canal)
	 */
	doNotify() {
		var aArgs = Array.prototype.slice.call(arguments, 0);
		aArgs.unshift('notify');
		this.oEmitter.emit.apply(this.oEmitter, aArgs);
	}
}

module.exports = TxatSystem;
