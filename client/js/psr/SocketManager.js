O2.createClass('psr.SocketManager', {

    oSocket: null,
    sUserName: 'neo',

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

    _send: function(sMessage, xData) {
        this.oSocket.emit(sMessage, xData);
    },

    /**
     * Connextion au serveur
     */
    connect: function () {

        var wsc = new WSC.SocketConnector();
        wsc.connect();

        this.oSocket = wsc.getSocket();
        this._registerNetworkHandlers();
    },

    /**
     * Récupération du socket
     *
     * @returns object Socket
     */
    getSocket: function () {
        return this.oSocket;
    },

    getUsername:  function () {
        return this.sUserName;
    },

    /* *************************** *
     * MESSAGE CLIENT VERS SERVEUR *
     * *************************** */

    send_login: function (sUserName) {
        this._send('LOGIN', {u: sUserName});
    },

    send_message: function (xMessage) {
        this._send('T_SAY', xMessage);
    },


    /* ****************************** *
     * RECEPTION DE MESSAGES SERVEURS *
     * ****************************** */

    net_HI: function (data) {
        this.sUserName = data.u;
        this.nUserID = data.id;
        console.log('Connexion :', this.sUserName, this.nUserID);
    },

    net_DN: function (data) {
        console.error('Erreur et déconnexion', data.e);
    },

    net_connect: function (socket) {
        console.log('Connexion au serveur !');
       this.send_login(this.sUserName);
    },

    net_disconnect: function (socket) {
        console.warn('Déconnexion du serveur !');
    },

    net_T_CM: function (data) {
        console.log(data);
    },


});
