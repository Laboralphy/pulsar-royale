(function($, O2) {
    var $main = $('#main');
    var $game = $('#game');
    O2.createClass("psr.Game", {
        oGameUI  : null,
        oTimeKeeper      : null,

        deck : null,

        _createGameController : function() {
            this.oGameUI = new psr.view.GameUI(this.deck);
        },
        enterMatchmaking : function(deck) {
            // @todo : randomisation du deck
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
            this._createGameController();
        },
        gameEnd : function() {

            // @todo : affichage de l'écran des scores
            this.oGameUI.destroy();
        }
    });

})(jQuery,O2);