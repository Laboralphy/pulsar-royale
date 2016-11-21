/**
 * Created by florian.saleur on 18/11/16.
 */
(function ($, O2) {
    var decks = [];
    O2.createClass("psr.view.cards.Deck", {
        _deck : null,

        $tab : null,
        $tabContent : null,

        draggedCard : null,

        __construct: function (deck) {
            this._deck = [];
            decks.push(this);
            this.deckId = decks.length;
            if (deck) {
                this.setDeck(deck);
            }
            this.makeTab();
            this.makeTabContent();
        },
        setDeck: function(deck) {
            for (var c in deck) {
                this._deck.push(new psr.view.cards.Card(deck[c]));
            }
            return this;
        },
        makeTab: function() {
            this.$tab = $('<li class="tab col s3"><a href="#deck'+ this.deckid +'" data-deckId="'+ this.deckId +'">'+ this.deckId +'</a></li>');
            return this;
        },
        makeTabContent: function() {
            var that = this;
            this.$tabContent = $('<div id="deck'+ this.deckId +'" class="row psrDeck">');
            for (var i = 0; i < 8; i++) {
                var $dropZone = $('<div class="dropZone" data-placement="'+i+'"></div>');
                $('<div class="col s3"></div>').append($dropZone).appendTo(this.$tabContent);
                $dropZone
                    .on('dragover', function(e) {
                        e.preventDefault();
                    })
                    .on('drop', function(e) {
                        var $this = $(this);
                        e.originalEvent.preventDefault();
                        $this.html(that.draggedCard.$card.clone());
                        that._deck[$this.data('placement')] = that.draggedCard.cardInfo['cardName'];
                        console.log(that._deck)
                    });
            }
            return this;
        }
    });
})(jQuery, O2);