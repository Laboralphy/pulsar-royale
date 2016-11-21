/**
 * Created by florian.saleur on 18/11/16.
 */
(function($, O2) {
    O2.extendClass("psr.view.Cards","psr.view.Abstract", {
        decks : null,
        $decks : null,

        current : null,

        $tabWrapper : null,
        __construct : function() {
            this.tabName = 'cards';
            this.title = 'Vos cartes';
            this.icon = '&#xE8F0;';
            this.tabTooltip = 'Vos cartes';
            __inherited();

            this.$tabWrapper = $('<ul class="tabs tabs-fixed-width black">').appendTo(this.$content);
            this.loadDecks();
            this.listing();
        },
        loadDecks : function() {
            this.decks = [];
            this.$decks = [];
            var decks = window.localStorage.getItem('decks');
            if (decks) {
                decks = JSON.parse(decks);
                for (var d in decks) {
                    var deck = new psr.view.cards.Deck(decks[d]);
                    this.$decks.push(deck);
                    deck.$tab.appendTo(this.$tabWrapper);
                    deck.$tabContent.appendTo(this.$content);
                }
            } else {
                var deck = new psr.view.cards.Deck(); // Deck vide
                this.$decks.push(deck);
                this.current = deck;
                deck.$tab.appendTo(this.$tabWrapper);
                deck.$tabContent.appendTo(this.$content);
            }
            this.$tabWrapper.tabs({
                onShow: function() {
                    this.current = decks[($(this).data('deckid') - 1)];
                }
            });
            var curDeck = window.localStorage.getItem('curDeck');
            if (curDeck && this.$decks[curDeck]) {
                this.$tabWrapper.tabs('select_tab', this.$decks[curDeck].$tab.attr('id'));
            }
            return this;
        },
        listing : function() {
            $('<h3>Cartes disponibles</h3>').appendTo(this.$content);
            for (var k in psr.config.cards) {
                var card = new psr.view.cards.Card(k);
                this.$content.append(card.$card);
            }
            return this;
        }
    });
})(jQuery,O2);