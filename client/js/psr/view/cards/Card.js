/**
 * Created by florian.saleur on 18/11/16.
 */
(function($, O2) {
    O2.createClass("psr.view.cards.Card", {
        $card : null,
        _defaultCard : {
            rrt : '?',
            lbl : '???',
            crd : 'img/nope.png'
        },
        cardInfo : null,
        __construct : function(cardId) {
            this.cardInfo = psr.config.cards[cardId] || this._defaultCard;
            this.cardInfo.cardName = cardId || null;
            this.initCard();
        },
        initCard : function() {
            this.$card = $('<div class="psrCard '+ this.cardInfo['rrt'] +'" draggable="true" data-tooltip="'+ this.cardInfo['lbl'] +'"><img draggable="false" src="'+ this.cardInfo['crd'] +'" width="100%"></div>');
            var $cardCoast = $('<div class="coast" data-coast="'+ this.cardInfo['cst'] +'" ><img src="svg/lightning.svg" /></div>')
            this.$card.append($cardCoast);
            $('[data-tooltip]', this.$card).tooltip();
            return this;
        }
    });
})(jQuery,O2);