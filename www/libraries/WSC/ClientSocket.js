O2.createObject('WSC.ClientSocket', {
	/**
	 * Initie la connexion au server 
	 * Utilise les données affichées dans la barre de location
	 * @return Socket
	 */
	connect: function() {
		var sIP = location.hostname;
		var sPort = location.port;
		var sProto = location.protocol;
		return io.connect(sProto + '//' + sIP + ':' + sPort + '/');
	},

	/**
	 * Définit un nouveau handler de message socket
	 * Lorsque le client recevra un message de ce type : il appelera la methode correspondante
	 * @param string sEvent message socket à prendre en compte
	 */
	setSocketHandler: function(sEvent, pHandler) {
		if (this.oEventHandlers === null) {
			this.oEventHandlers = {};
		}
		this.oEventHandlers[sEvent] = pHandler;
		this.oSocket.on(sEvent, pHandler);
	},
});
