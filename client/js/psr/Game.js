(function($, O2) {
    var $main = $('#main');
    var $game = $('#game');
    O2.createClass("psr.Game", {
        GameController : null,

        __construct : function() {

        },
        _createGameController : function(deck) {
            this.GameController = new psr.GameController(deck);
        },
        enterMatchmaking : function(deck) {
            // @todo : randomisation du deck
            // @todo : enter matchmaking coté serveur
            this._createGameController(deck);
        },
        leaveMatchmaking : function() {
            // @todo : leave matchmaking coté serveur
            this.GameController.hide();
        },
        destroy : function() {

        }
    });

})(jQuery,O2);