/**
 * Created by florian.saleur on 17/11/16.
 */
(function($, O2) {
    $(function() {
        var $view = $(".view","#main");
        var oShop = new psr.view.Shop();
        var oCards = new psr.view.Cards();
        var oBattle = new psr.view.Battle();
        var oChat = new psr.view.Chat();
        var oGame = new psr.Game();

        oBattle
            .on('enterMatchmaking', function() {
                var deck = oCards.getCurDeck();
                try {
                    //@todo : validation du deck avant lancement
                    //oSocket.enterMatchmaking(deck.deck);
                    oGame.enterMatchmaking(deck.deck);
                } catch (e) {
                    console.log(e);
                    Materialize.toast(e,3000);
                    oBattle.toggleInQueue();
                }
            })
            .on('leaveMatchmaking', function() {
                oGame.leaveMatchmaking();
            });
        $view.perfectScrollbar();
        $(".init-tabs").addClass("tabs tabs-fixed-width").tabs({
            onShow: function() {
                $view.perfectScrollbar("update");
            }
        });
        $(".init-tabs").tabs('select_tab', 'battle');
    })
})(jQuery, O2);