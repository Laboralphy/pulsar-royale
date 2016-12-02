(function($, O2) {
    /**
     * Elément de vue pour une carte de jeu
     */
    O2.createClass("psr.view.cards.Card", {
        /**
         * Le rendu de la carte
         * @type: jQuery
         */
        $card : null,

        /**
         * Valeurs par défaut d'une carte inconnue
         * @type: Object
         */
        _defaultCard : {
            rrt : '?',
            lbl : '???',
            crd : 'img/nope.png'
        },
        /**
         * Description des propriétés d'une carte
         * @type: Object
         */
        _description : {
            "hp" : {
                "label" : "Points de vie"
            },
            "dmg" : {
                "label" : "Dégats"
            },
            "asp" : {
                "label" : "Vitesse d'attaque"
            },
            "dps" : {
                "label" : "DPS",
                "value" : function() { return Math.floor(this.cardInfo.dmg * this.cardInfo.asp); }
            },
            "tgt" : {
                "label" : "Cibles"
            },
            "rng" : {
                "label" : "Portée"
            },
            "spd" : {
                "label" : "Vitesse de déplacement"
            }
        },
        /**
         * Infos de la carte
         * @type: Object
         */
        cardInfo : null,
        __construct : function(cardId) {
            this.cardInfo = psr.config.cards[cardId] || this._defaultCard;
            this.cardInfo.cardName = cardId || null;
            this.initCard();
        },
        /**
         * Initialise la carte avec la configuration fournie par cardInfo
         * @returns {psr.view.cards.Card}
         */
        initCard : function() {
            this.$card = $('<div class="psrCard '+ this.cardInfo['rrt'] +'" draggable="true" data-tooltip="'+ this.cardInfo['lbl'] +'"><img draggable="false" src="'+ this.cardInfo['crd'] +'" width="100%"></div>');
            var $cardCoast = $('<div class="coast" data-coast="'+ this.cardInfo['cst'] +'" ><img src="svg/lightning.svg" /></div>')
            this.$card.append($cardCoast);
            $('[data-tooltip]', this.$card).tooltip();
            return this;
        },
        /**
         * Génère une modal de description de la carte
         * @returns {psr.view.cards.Card}
         */
        showDescription : function() {
            var that = this;
            var $content = $('<div class="row psrCardInfo">');
            var $desc = $('<div class="row psrCardDesc">').appendTo($content);
            $desc
                .append($('<div class="col s3">').append(that.$card.clone()))
                .append($('<div class="col s9">'+ that.cardInfo.dsc +'</div>'));
            var $stats = $('<div class="row psrCardStats">').appendTo($content);
            var i = 1;
            for (var cell in that._description) {
                var desc = that._description[cell];
                if (this.cardInfo[cell] || desc['value']) {
                    var val = this.cardInfo[cell] || desc['value'].bind(that)();
                    if (val) {
                        var $cell = $('<div class="col s6"><div class="col s2"><img src="img/'+ cell +'.png" /></div><div class="col s10"><div class="lbl">' + desc.label + '</div>' + val + '</div></div>').appendTo($stats);
                        if (i % 2 == 0 && i % 4 != 0 || ((i - 1) % 2) == 0 && ((i - 1) % 4) != 0) {
                            $cell.addClass('grey darken-3');
                        } else {
                            $cell.addClass('grey darken-4');
                        }
                        i++;
                    }
                }
            }
            Materializer.createModal({
                "header" : that.cardInfo.lbl,
                "content" : $content
            });
            return this;
        }
    });
})(jQuery,O2);