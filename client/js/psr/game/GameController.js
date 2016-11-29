(function($, O2) {
    var $main = $('#main');
    var $game = $('#game');
    O2.createClass("psr.game.GameController", {
        deck    : null,
        focusedCard : null,

        $grid   : null,
        $tpl    : null,

        $energy : null,

        $socle  : null,
        $next   : null,
        $cards  : null,

        _gridHeight : 30,
        _gridWidth  : 18,

        __construct : function(randomizedDeck) {
            this.deck = randomizedDeck;
            this.$tpl = $('<div class="tplCard">');
            this._makeGrid();
            this._makeSocle();
            this.show();
            $main.css('background-image', "url(img/background-royale.png)");
        },
        _makeGrid : function () {
            var that = this;
            this.$grid = $('<table class="gameController">').appendTo($game);
            that.on('cardFocus', function() {
                that.$grid.addClass('gShow');
            });
            that.on('cardUnFocus', function() {
                that.$grid.removeClass('gShow');
            })
            var $tr, $td;
            for (var h = 0; h < this._gridHeight; h++) {
                $tr = $('<tr>').appendTo(this.$grid);
                for (var w = 0; w < this._gridWidth; w++) {
                    $td = $('<td data-x="'+ h +'" data-y="'+ w +'">').appendTo($tr);
                    if (h > (this._gridHeight / 2)) {
                        $td.addClass('available')
                    }
                }
            }
            this.$grid
                .on('mouseover click', function(e) {
                    if (that.focusedCard) {
                        if (e.target.tagName == "TD") {
                            var $td = $(e.target);
                            if (e.type == "click") {
                                // @todo : communiquer cette cordonnée au server
                                console.log('larguage',$td.data('x'), $td.data('y'));
                                that._dropCard(e);
                            } else {
                                var cardInfo = that.focusedCard.cardInfo;
                                var $tplImg = $('<img src="'+ cardInfo.crd +'">')
                                    .css({
                                        height : cardInfo.hgt * $td.height(), // Hauteur de l'unité (en case)
                                        width : cardInfo.wgt * $td.width(),
                                    });
                                that.$tpl.prependTo(that.$grid).offset($td.offset()).html($tplImg);
                            }
                        } else {
                            console.log(e)
                        }
                    }
                })
                .on('mouseleave', function(e) {
                    that.$tpl.detach();
                });
        },
        _dropCard : function(e) {
            this.focusedCard.$card.parent().after(this.deck[4].$card.parent());
            this.focusedCard.$card.parent().appendTo(this.$socle);

            var cardIndex = this.deck.indexOf(this.focusedCard);
            this.deck.push(this.deck.splice(cardIndex, 1)[0]);
            // this.focusedCard.
            this.$tpl.detach();

            this.focusedCard.$card.trigger('click');
            this._showNextCard();
        },
        _makeSocle : function() {
            var that = this;
            var oCard;
            var $socleWrapper = $('<div id="socleWrapper">').appendTo($game);
            this.$socle = $('<div class="row">').appendTo($socleWrapper);
            this.$next = $('<div class="col s2 next">').appendTo(this.$socle);
            this.$cards = $('<div class="col s10" id="socle">').appendTo(this.$socle);
            this.$energy = $('<div class="energy"><div class="jauge"><img src="svg/lightning.svg" /></div></div>').appendTo($socleWrapper);
            for (var card in this.deck) {
                this._createCard(card);
            }
            this._showNextCard();
        },
        _createCard : function(card) {
            var that = this;
            var cardName = this.deck[card];
            var oCard = new psr.view.cards.Card(cardName);
            this.deck[card] = oCard;
            this.$cards.append($('<div class="col s3">').append(oCard.$card));
            oCard.$card
                .on('click', function() {
                    if (that.focusedCard && that.focusedCard != oCard) {
                        that.focusedCard.$card.removeClass('focus');
                    }
                    if (oCard.$card.hasClass('focus')) {
                        that.focusedCard = null;
                        that.trigger('cardUnFocus');
                    } else {
                        that.focusedCard = oCard;
                        that.trigger('cardFocus');
                    }
                    oCard.$card.toggleClass('focus');
                });
            return this;
        },
        _showNextCard : function() {
            this.$next.html(this.deck[4].$card.clone());
        },
        show : function() {
            $main.find('.view, .navbar').css('transform','scale(1,0)');
            return this;
        },
        hide : function() {
            $main.find('.view, .navbar').css('transform','');
            return this;
        },
        destroy : function() {
            this.$grid.remove();
            this.$grid = null;
        }
    });
    O2.mixin(psr.game.GameController, O876.Mixin.Events);
})(jQuery,O2);