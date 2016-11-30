O2.createClass("psr.Chat", {

    oSocketManager: null,
    oView: null,


    initView: function (oView) {
        this.oView = oView;
    },

    initSocket: function (oSocketManager) {
        var sMsg = 'Bonjour';

        this.oSocketManager = oSocketManager;
        this.oSocketManager.send_message(sMsg);

        this.oView.addBulle(this.oSocketManager.getUsername(), sMsg);
    },
});
