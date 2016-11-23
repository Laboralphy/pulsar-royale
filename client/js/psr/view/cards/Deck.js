/**
 * Created by florian.saleur on 18/11/16.
 */
(function ($, O2) {
    var decks = [];
    O2.createClass("psr.view.cards.Deck", {
        deck : null,

        $tab : null,
        $tabContent : null,

        draggedCard : null,

        __construct: function (deck) {
            this.deck = deck || [];
            decks.push(this);
            this.deckId = decks.length;
            this.makeTab();
            this.makeTabContent();
        },
        makeTab: function() {
            this.$tab = $('<li class="tab col s3"><a href="#deck'+ this.deckId +'" data-deckid="'+ this.deckId +'">'+ this.deckId +'</a></li>');
            return this;
        },
        makeTabContent: function() {
            var that = this;
            this.$tabContent = $('<div id="deck'+ this.deckId +'" class="row psrDeck">');
            for (var i = 0; i < 8; i++) {
                var $dropZone = $('<div class="dropZone" data-placement="'+i+'"></div>');
                $('<div class="col s3"></div>').append($dropZone).appendTo(this.$tabContent);
                if (this.deck[i]) {
                    new psr.view.cards.Card(this.deck[i]).$card.appendTo($dropZone);
                }
                $dropZone
                    .on('dragover', function(e) {
                        var $this = $(this);
                        e.preventDefault();
                        $this.css('opacity','0.5');
                    })
                    .on('dragexit dragleave drop dragend', function() {
                        var $this = $(this);
                        $this.css('opacity','');
                    })
                    .on('drop', function(e) {
                        var $this = $(this);
                        e.originalEvent.preventDefault();
                        var cardName = that.draggedCard.cardInfo['cardName'];
                        if (that.deck.indexOf(cardName) == -1) {
                            $this.html(that.draggedCard.$card.clone());
                            that.deck[$this.data('placement')] = that.draggedCard.cardInfo['cardName'];
                            that.trigger('changed');
                        } else {
                            Materialize.toast('Cette carte est déjà dans le deck...', 3000);
                        }
                    });
            }
            return this;
        }
    });
    O2.mixin(psr.view.cards.Deck, O876.Mixin.Events);
})(jQuery, O2);