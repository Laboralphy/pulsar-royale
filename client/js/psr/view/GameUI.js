(function($, O2) {
    var $main = $('#main');
    var $game = $('#game');
    /**
     * UI de controle d'une partie
     */
    O2.createClass("psr.view.GameUI", {
        /**
         * Le deck actuellement chargé
         * @type : Array
         */
        deck    : null,
        /**
         * Carte qui a le focus
         * @type : Object
         */
        focusedCard : null,

        /**
         * @type {psr.view.gameController.Grid}
         */
        oGrid : null,
        /**
         * @type {psr.view.gameController.Socle}
         */
        oSocle : null,
        /**
         * @type {psr.view.gameController.Timer}
         */
        oTimer : null,

        /**
         * Wrapper du modèle de l'unité en cours de drop
         * @type : jQuery
         */
        $tpl    : null,

        _gridHeight : 30,
        _gridWidth  : 18,

        __construct : function(randomizedDeck) {
            this.deck = randomizedDeck;
            this.$tpl = $('<div class="tplCard">');
            this._makeGrid()
                ._makeSocle()
                ._makeTimer()
                .show();
            $main.addClass('arene');
        },
        /**
         * Génère la grille
         * @returns {psr.view.GameUI}
         * @private
         */
        _makeGrid : function () {
            var that = this;

            this.oGrid = new psr.view.gameController.Grid();
            var $grid = this.oGrid.$grid;
            $grid.appendTo($game)
                .on('mouseover click', function(e) {
                    if (that.focusedCard) {
                        if (e.target.tagName == "TD") {
                            var $td = $(e.target);
                            if (e.type == "click") {
                                // @todo : communiquer cette cordonnée au server
                                that._dropCard($td.data('x'), $td.data('y'));
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
                                that.$tpl.prependTo($grid).offset(offset).html($tplImg);
                            }
                        } else {
                            console.log(e)
                        }
                    }
                })
                .on('mouseleave', function(e) {
                    that.$tpl.detach();
                });
            that
                .on('cardFocus', function() {
                    $grid.addClass('gShow');
                }).on('cardUnFocus', function() {
                    $grid.removeClass('gShow');
                });
            return this;
        },
        /**
         * Génération du socle
         * @returns {psr.view.GameUI}
         * @private
         */
        _makeSocle : function() {
            var $socleWrapper = $('<div id="socleWrapper">').appendTo($game);
            this.oSocle = new psr.view.gameController.Socle();
            $socleWrapper.append(this.oSocle.$socle).append(this.oSocle.oEnergy.$energy);
            for (var card in this.deck) {
                this._createCard(card);
            }
            this._showNextCard();
            return this;
        },
        /**
         * Génération du timer
         * @returns {psr.view.GameUI}
         * @private
         */
        _makeTimer: function() {
            this.oTimer = new psr.view.gameController.Timer();
            this.oTimer.$timer.appendTo($game);
            return this;
        },
        /**
         * Génération d'une carte
         * @param card
         * @returns {psr.view.GameUI}
         * @private
         */
        _createCard : function(card) {
            var that = this;
            var cardName = this.deck[card];
            var oCard = new psr.view.cards.Card(cardName);
            this.deck[card] = oCard;
            this.oSocle.$cards.append($('<div class="col s3">').append(oCard.$card));
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
        /**
         * Methode publique de drop d'une carte du deck
         * @returns {psr.view.GameUI}
         */
        dropCard : function() {
            this.oSocle.oEnergy.removeEnergy(this.focusedCard.cardInfo.cst);

            this.focusedCard.$card.parent().after(this.deck[4].$card.parent());
            this.focusedCard.$card.parent().appendTo(this.oSocle.$socle);

            var cardIndex = this.deck.indexOf(this.focusedCard);
            this.deck.push(this.deck.splice(cardIndex, 1)[0]);

            this.$tpl.detach();

            this.focusedCard.$card.trigger('click');
            this._showNextCard();
            return this;
        },
        /**
         * Méthode interne déclaration d'un drop
         * @param x
         * @param y
         * @returns {psr.view.GameUI}
         * @private
         */
        _dropCard : function(x, y) {
            var dropInfo = {
                card : this.focusedCard.cardInfo.cardName,
                coord : {
                    x : x,
                    y : y
                }
            };
            this.trigger('dropCard', dropInfo);
            return this;
        },
        /**
         * Demande au socle d'afficher la carte suivante
         * @returns {psr.view.GameUI}
         * @private
         */
        _showNextCard : function() {
            this.oSocle.$next.html(this.deck[4].$card.clone());
            return this;
        },
        /**
         * Manipule le timer et le socle pour définir le time actuel du jeu
         * @param timeInfo
         * @returns {psr.view.GameUI}
         */
        setTimer : function(timeInfo) {
            this.oTimer.setTime(timeInfo.time);
            this.oSocle.setTime(timeInfo.time);
            return this;
        },
        /**
         * Affiche le GameUI et masque home
         * @returns {psr.view.GameUI}
         */
        show : function() {
            $main.find('.view, .navbar').css('transform','scale(1,0)');
            return this;
        },
        /**
         * Masque GameUI et retourne sur home
         * @returns {psr.view.GameUI}
         */
        hide : function() {
            $main.find('.view, .navbar').css('transform','');
            $main.removeClass('arene');
            return this;
        },
        /**
         * Détruit le controlleur de jeu
         * @returns {psr.view.GameUI}
         */
        destroy : function() {
            this.hide();
            $game.empty();
            return this;
        }
    });
    O2.mixin(psr.view.GameUI, O876.Mixin.Events);
})(jQuery,O2);