(function($, O2, moment) {
    O2.createClass("psr.view.gameController.Timer", {

        $timer : null,
        offset : 0,
        __construct : function() {
            this.$timer = $('<div class="gameTimer">');
        },
        setTime : function(time) {
            var oMoment = moment.unix(180 - (time / 1000) + this.offset);
            this.$timer.text(oMoment.format('mm:ss'));
        }
    });
    O2.mixin(psr.view.gameController.Timer, O876.Mixin.Events);
})(jQuery, O2, moment);