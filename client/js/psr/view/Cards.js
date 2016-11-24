/**
 * Created by florian.saleur on 18/11/16.
 */
(function($, O2) {
    O2.extendClass("psr.view.Cards","psr.view.Abstract", {
        decks : null,

        cards : null,

        curDeck : null,

        $tabWrapper : null,
        __construct : function() {
            var that = this;
            this.tabName = 'cards';
            this.title = 'Vos cartes';
            this.icon = '&#xE8F0;';
            this.tabTooltip = 'Vos cartes';
            __inherited();

            this.cards = [];
            $('<a class="btn-floating waves-effect waves-light cyan right"><i class="material-icons">add</i></a>')
                .appendTo(this.$title.find('h3'))
                .on('click', function() {
                    that._createDeck();
                });
            this.$tabWrapper = $('<ul class="tabs tabs-fixed-width black">').appendTo(this.$content);
            this.loadDecks();
            this.listing();
        },
        loadDecks : function() {
            that = this;
            this.decks = [];
            var decks = window.localStorage.getItem('decks');
            if (decks) {
                decks = JSON.parse(decks);
                for (var d in decks) {
                    this._createDeck(decks[d]);
                }
            } else {
                that.curDeck = this._createDeck();
            }
            this.$tabWrapper.tabs({
                onShow: function() {
                    that._setCurDeck($(this).data('deckid'))._filter();
                }
            });
            var curDeck = window.localStorage.getItem('curDeck');
            if (curDeck && this.decks[curDeck]) {
                this.$tabWrapper.tabs('select_tab', this.decks[curDeck].$tabContent.attr('id'));
            }
            return this;
        },
        listing : function() {
            var that = this;
            $('<h3>Cartes disponibles</h3>').appendTo(this.$content);
            for (var k in psr.config.cards) {
                this._createCard(k);
            }
            this._filter();
            return this;
        },
        _createCard : function(k) {
            var that = this;
            var card = new psr.view.cards.Card(k);
            that.cards.push(card);
            this.$content.append($('<div class="col s3">').append(card.$card));
            card.$card
                .on('dragstart', function(e) {
                    e.originalEvent.dataTransfer.setData('text', '');
                    that.curDeck.draggedCard = card;
                })
                .on('click', card.showDescription.bind(card));
            return card;
        },
        _createDeck : function(deck) {
            var that = this;
            if (that.decks.length >= 12) {
                Materialize.toast('Le système est limité à 12 decks', 3000);
                return false;
            }
            var deck = new psr.view.cards.Deck(deck);
            this.decks.push(deck);
            deck.$tab.appendTo(this.$tabWrapper);
            this.$tabWrapper.after(deck.$tabContent);
            deck.on('changed', function() {
                that._filter()._save();
            });
            this.curDeck = deck;
            this.$tabWrapper.find('.indicator').remove();
            this.$tabWrapper.tabs();
            return deck;
        },
        _filter : function() {
            this.cards.map(function(card) {
                var $wrapper = card.$card.parent();
                if (that.curDeck.deck.indexOf(card.cardInfo.cardName) == -1) {
                    $wrapper.show();
                } else {
                    $wrapper.hide();
                }
            });
            return this;
        },
        _save : function() {
            var decks = [];
            this.decks.map(function(deck){
                decks.push(deck.deck);
            });
            window.localStorage.setItem('decks', JSON.stringify(decks));
            return this;
        },
        _setCurDeck : function(idDeck) {
            window.localStorage.setItem('curDeck',(idDeck  - 1));
            this.curDeck = this.decks[(idDeck  - 1)];
            return this;
        }
    });
})(jQuery,O2);