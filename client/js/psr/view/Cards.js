/**
 * Created by florian.saleur on 18/11/16.
 */
(function($, O2) {
    O2.extendClass("psr.view.Cards","psr.view.Abstract", {
        decks : null,
        __construct : function() {
            this.tabName = 'cards';
            this.title = 'Vos cartes';
            this.icon = '&#xE8F0;';
            this.tabTooltip = 'Vos cartes';
            __inherited();

            this.loadDecks();
            this.tabs();
            this.listing();
        },
        loadDecks : function() {
            this.decks = [];
            var decks = window.localStorage.getItem('decks');
            if (decks) {
                decks = JSON.parse(decks);
            }
        },
        tabs : function() {

        },
        listing : function() {
            for (var k in psr.config.cards) {
                var card = psr.config.cards[k];
                this.$content.append('<div class="col s3 center-align"><img src="'+ card['crd'] +'" width="100%"><span class="title">'+ card['lbl'] +'</span></div>');
            }
        }
    });
})(jQuery,O2);