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
            this.cardInfo = psr.config.cards[cardId] || _defaultCard;
            this.initCard();
        },
        initCard : function() {
            this.$card = $('<div class="col s3"><div class="psrCard '+ this.cardInfo['rrt'] +'" data-tooltip="'+ this.cardInfo['lbl'] +'"><img src="'+ this.cardInfo['crd'] +'" width="100%"></div></div>');
            $('[data-tooltip]', this.$card).tooltip();
        }
    });
})(jQuery,O2);