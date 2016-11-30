(function($, O2) {
    var $main = $('#main');
    var $game = $('#game');
    O2.createClass("psr.GameController", {
        deck    : null,
        focusedCard : null,

        $grid   : null,
        $tpl    : null,

        _gridHeight : 30,
        _gridWidth  : 18,

        __construct : function(randomizedDeck) {
            this.deck = randomizedDeck;
            this.$tpl = $('<div class="tplCard">');
            this._makeGrid();
            this._makeSocle();
            this._makeTimer();
            this.show();
            $main.addClass('arene');
        },
        _makeGrid : function () {
            var that = this;
            this.grid = new psr.view.gameController.Grid();
            this.grid.$grid.appendTo($game);
            that.on('cardFocus', function() {
                that.grid.$grid.addClass('gShow');
            });
            that.on('cardUnFocus', function() {
                that.grid.$grid.removeClass('gShow');
            })
            this.grid.$grid
                .on('mouseover click', function(e) {
                    if (that.focusedCard) {
                        if (e.target.tagName == "TD") {
                            var $td = $(e.target);
                            if (e.type == "click") {
                                // @todo : communiquer cette cordonnée au server
                                console.log('larguage', $td.data('x'), $td.data('y'));
                                that._dropCard(e);
                            } else {
                                var cardInfo = that.focusedCard.cardInfo;
                                var $tplImg = $('<img src="'+ cardInfo.crd +'">')
                                    .css({
                                        height : cardInfo.hgt * $td.height(), // Hauteur de l'unité (en case)
                                        width : cardInfo.wgt * $td.width(),
                                    });
                                var offset = $td.offset();
                                if (cardInfo.hgt > 1) {
                                    offset.top -= $td.height() * (cardInfo.hgt / 2);
                                    if (cardInfo.hgt % 2 == 0) offset.top += ($td.height() / 2);
                                }
                                if (cardInfo.wgt > 1) {
                                    offset.left -= $td.width() * (cardInfo.wgt / 2);
                                    if (cardInfo.wgt % 2 == 0) offset.left += ($td.height() / 2);
                                        }
                                that.$tpl.prependTo(that.grid.$grid).offset(offset).html($tplImg);
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
            try {
                this.socle.energy.removeEnergy(this.focusedCard.cardInfo.cst);

                this.focusedCard.$card.parent().after(this.deck[4].$card.parent());
                this.focusedCard.$card.parent().appendTo(this.socle.$socle);

                var cardIndex = this.deck.indexOf(this.focusedCard);
                this.deck.push(this.deck.splice(cardIndex, 1)[0]);

                this.$tpl.detach();

                this.focusedCard.$card.trigger('click');
                this._showNextCard();
            } catch (e) {
                Materialize.toast(e, 3000);
            }
        },
        _makeSocle : function() {
            var $socleWrapper = $('<div id="socleWrapper">').appendTo($game);
            this.socle = new psr.view.gameController.Socle();
            $socleWrapper.append(this.socle.$socle).append(this.socle.energy.$energy);
            for (var card in this.deck) {
                this._createCard(card);
            }
            this._showNextCard();
        },
        _makeTimer: function() {
            this.timer = new psr.view.gameController.Timer();
        },
        _createCard : function(card) {
            var that = this;
            var cardName = this.deck[card];
            var oCard = new psr.view.cards.Card(cardName);
            this.deck[card] = oCard;
            this.socle.$cards.append($('<div class="col s3">').append(oCard.$card));
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
            this.socle.$next.html(this.deck[4].$card.clone());
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
    O2.mixin(psr.GameController, O876.Mixin.Events);
})(jQuery,O2);