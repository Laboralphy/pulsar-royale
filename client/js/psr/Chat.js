O2.createClass("psr.Chat", {

    oSocketManager: null,
    oSocket: null,
    oView: null,
    $inputSend: null,

    initView: function (oView) {
        this.oView = oView;
        this.$inputSend = this.oView.getInputSend();
    },

    initSocket: function (oSocketManager) {

        this.oSocketManager = oSocketManager;
        this.oSocket = this.oSocketManager.getSocket();

        // Attente d'un message
        this.oSocket.on('T_CM', (function (data) {
            console.log(data);
            this.oView.addBulle(data.u, data.m);
        }).bind(this));

        // Envoi d'un message
        this.$inputSend.on('keydown', function (oEvent) {
            switch (oEvent.which) {
                case 13:
                    oSocketManager.send_message(oEvent.target.value);
                    oEvent.target.value = '';
                    break;
            }
        });

    },
});
