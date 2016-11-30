O2.createClass('WSC.SocketConnector', {
    oSocket: null,

    /**
     * Initie la connexion au server
     * Utilise les données affichées dans la bar de location
     */
    connect: function () {
        var sIP = location.hostname;
        var sPort = location.port;
        var sProto = location.protocol;
        this.oSocket = io.connect(sProto + '//' + sIP + ':' + sPort + '/');
        return this;
    },

    getSocket: function() {
        return this.oSocket;
    }
});
