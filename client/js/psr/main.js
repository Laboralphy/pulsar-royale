/**
 * Created by florian.saleur on 17/11/16.
 */
(function($, O2) {
    $(function() {

        var oSocket = new WSC.Socket();
        var sUserName;
        var nUserID;


        var $view = $(".view","#main");
        var oShop = new psr.view.Shop();
        var oCards = new psr.view.Cards();
        var oBattle = new psr.view.Battle();
        var oGame = new psr.Game();
        
		
        /*
         * Le systeme de chat
         */
        var oChatView = new psr.view.Chat();
		var oChat = new psr.Chat();
        oChat.initView(oChatView);
        oChat.initSocket(oSocket);
        
        
        
        
        ////// CONNECTION AU SERVEUR ////// CONNECTION AU SERVEUR ////// CONNECTION AU SERVEUR //////
        ////// CONNECTION AU SERVEUR ////// CONNECTION AU SERVEUR ////// CONNECTION AU SERVEUR //////
        ////// CONNECTION AU SERVEUR ////// CONNECTION AU SERVEUR ////// CONNECTION AU SERVEUR //////


        oSocket.on('connection', function(socket) {
			this.oSocket.emit('LOGIN', {u: 'neo'});
		});

        oSocket.on('HI', (function(data) {
			sUserName = data.u;
			nUserID = data.id;
			//this.oSocket.emit('...', {});
		}).bind(this));

        oSocket.on('DN', (function(data) {
			console.error('Erreur et déconnexion', data.e);
		}).bind(this));

        oSocket.on('connection', function(socket) {
			this.oSocket.emit('LOGIN', {u: 'neo'});
		});

        oSocket.on('disconnect', function(socket) {
			console.warning('Déconnection !');
		});

		oSocket.connect();
        

        oBattle
            .on('enterMatchmaking', function() {
                var deck = oCards.getCurDeck();
                try {
                    deck.validate();
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
