O2.createClass('psr.SocketManager', {

    oSocket: null,
    sUserName: null,
    sChannel: 'general',

    /**
     * Toutes les methode commencant par "net_" doivent correspondre
     * a un message réseau venant du serveur
     * Ici on les associe à un écouteur
     */
    _registerNetworkHandlers: function () {
        var r;
        for (var sMeth in this) {
            r = sMeth.match(/^net_([_a-z0-9]+)$/i);
            if (r) {
                this.oSocket.on(r[1], this[sMeth].bind(this));
            }
        }
    },

    _send: function (sMessage, xData) {
        console.log('envoi msg', sMessage,xData );
        this.oSocket.emit(sMessage, xData);
    },

    /**
     * Connextion au serveur
     */
    connect: function (sUserName) {
        if (sUserName == '') {
            console.error('Pseudo vide !');
            return false;
        } else {
            this.sUserName = sUserName;

            var wsc = new WSC.SocketConnector();
            wsc.connect();

            this.oSocket = wsc.getSocket();
            this._registerNetworkHandlers();
            return true;
        }
    },

    /**
     * Récupération du socket
     *
     * @returns object Socket
     */
    getSocket: function () {
        return this.oSocket;
    },

    getUsername: function () {
        return this.sUserName;
    },

    /* *************************** *
     * MESSAGE CLIENT VERS SERVEUR *
     * *************************** */

    send_login: function (sUserName) {
        this._send('LOGIN', {u: sUserName});
    },

    send_message: function (sMessage) {
        this._send('T_SAY', {m: sMessage, c: this.sChannel});
    },


    /* ****************************** *
     * RECEPTION DE MESSAGES SERVEURS *
     * ****************************** */

    net_HI: function (data) {
        this.sUserName = data.u;
        this.nUserID = data.id;
        console.log('Connexion :', this.sUserName, this.nUserID);
        // this.send_message('Connexion !!!');
    },

    net_DN: function (data) {
        console.error('Impossible de se connecter', data.e);
    },

    net_connect: function (socket) {
        console.log('Connexion au serveur... [ Ok ]');
        this.send_login(this.sUserName);
    },

    net_disconnect: function (socket) {
        console.warn('Déconnexion du serveur...[ Ok ]');
    },


});

O2.mixin(psr.SocketManager, O876.Mixin.Events);
O2.mixin(psr.SocketManager, O876.Mixin.Data);