/**
 * Created by florian.saleur on 17/11/16.
 */
(function ($, O2) {
    $(function () {

        // Formulaire de connexion
        var $formLogin = $('<form id="pr-form-login col s2 offset-s1"></form>');
        var $divRow = $('<div class="row"></div>');
        var $inputField = $('<div class="input-field col s6 offset-s3"><label for="pseudo">Pseudo</label></div>');
        var $input = $('<input id="pseudo" type="text" class="pr-pseudo" autocomplete="off"/>');
        var $divBtn = $('<div class="col s6 offset-s3 center-align"></div>');
        var $btn = $('<button type="submit" class="pr-login waves-effect waves-light btn"><i class="material-icons right">&#xE163;</i>Lancer</button>');
        var $prTop = $('<div class="pr-top row"><div>');

        $prTop.append($formLogin.append($divRow.append($inputField.append($input), $divBtn.append($btn))));

        // Body et ajout du formulaire au body
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

        $formLogin.on('submit', function (oEvent) {
            oEvent.preventDefault();
            var $pseudo = $input.val();
            if (oSocketManager.connect($pseudo) === true) {
                oChat.initView(oChatView);
                oChat.initSocket(oSocketManager);
                $prTop.addClass('pr-hidden');
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
