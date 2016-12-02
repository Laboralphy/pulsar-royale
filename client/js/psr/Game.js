(function($, O2) {
    var $main = $('#main');
    var $game = $('#game');
    O2.createClass("psr.Game", {
        oSocket : null,

        oGameUI  : null,
        oTimeKeeper      : null,

        deck : null,

        __construct : function(oSocket) {
            this.oSocket = oSocket;
        },
        enterMatchmaking : function(deck) {
            // @todo : randomisation du deck par le serveur
            // @todo : enter matchmaking coté serveur
            this.deck = deck;
            this.gameStart();
        },
        leaveMatchmaking : function() {
            // @todo : leave matchmaking coté serveur
            this.oGameUI.hide();
        },
        gameStart : function() {
            var that = this;
            // Gestion du temps
            this.oTimeKeeper = new psr.TimeKeeper();
            this.oTimeKeeper
                .on("nextFrame", function(data) {
                    that.oGameUI.setTimer(data);
                })
                .one("hurryUp", function() {
                    Materialize.toast("Energie x 2", 3000);
                    that.oGameUI.oSocle.oEnergy.speed = 2;
                })
                .one("mortSubite", function() {
                    Materialize.toast("Mort subite !", 3000);
                    that.oGameUI.oTimer.offset = 180;
                })
                .one("timeIsUp", function() {
                    that.gameEnd();
                });
            // Gestion du controle du jeu
            this.oGameUI = new psr.view.GameUI(this.deck);
            this.oGameUI
                .on('dropCard', function(dropInfo) {
                    console.log('oSocket.emit', dropInfo);
                });

            // this.oSocket
            //     .on('droppedCard', function(dropInfo) {
            //         this.oGameUI.drop(dropInfo);
            //     });
        },
        gameEnd : function() {
            // @todo : affichage de l'écran des scores
            this.oGameUI.destroy();
        }
    });

})(jQuery,O2);