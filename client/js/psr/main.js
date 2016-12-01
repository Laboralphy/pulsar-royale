/**
 * Created by florian.saleur on 17/11/16.
 */
(function ($, O2) {
    $(function () {

        var $input = $('<input id="pseudo" type="text" class="pr-pseudo" autocomplete="off"/>');
        var $inputField = $('<div class="input-field col s6 offset-s3 valign"><label for="pseudo">Pseudo</label></div>').append($input);
        var $btn = $('<a class="pr-login waves-effect waves-light btn col s6 offset-s3"><i class="material-icons right">&#xE163;</i>Démarrer</a>');
        var $prTop = $('<div class="pr-top row"><div>').append($inputField, $btn);
        var $body = $('body');

        $body.append($prTop);


        var oSocketManager = new psr.SocketManager();

        var $view = $(".view", "#main");
        var oShop = new psr.view.Shop();
        var oCards = new psr.view.Cards();
        var oBattle = new psr.view.Battle();
        var oGame = new psr.Game();

        /* ****************** *
         * Le systeme de chat *
         * ****************** */
        var oChatView = new psr.view.Chat();
        var oChat = new psr.Chat();

        $btn.on('click', function () {
            var $pseudo = $input.val();
            if (oSocketManager.connect($pseudo) === true) {
                oChat.initView(oChatView);
                oChat.initSocket(oSocketManager);
                $prTop.addClass('pr-hidden');
            }
        });

        $input.on('keydown', function (oEvent){
            switch (oEvent.which) {
                case 13:
                    $btn.trigger('click');
                    oEvent.target.value = '';
                    break;
            }
        });

        oBattle
            .on('enterMatchmaking', function () {
                var deck = oCards.getCurDeck();
                try {
                    deck.validate();
                    oGame.enterMatchmaking(deck.deck);
                } catch (e) {
                    console.log(e);
                    Materialize.toast(e, 3000);
                    oBattle.toggleInQueue();
                }
            })
            .on('leaveMatchmaking', function () {
                oGame.leaveMatchmaking();
            });
        $view.perfectScrollbar();
        $(".init-tabs").addClass("tabs tabs-fixed-width").tabs({
            onShow: function () {
                $view.perfectScrollbar("update");
            }
        });
        $(".init-tabs").tabs('select_tab', 'battle');
    })
})(jQuery, O2);
