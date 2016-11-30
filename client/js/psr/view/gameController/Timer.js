(function($, O2) {
    O2.createClass("psr.view.gameController.Timer", {
        startTime   : null,
        time        : null,

        __construct : function() {
            this.animate();
        },
        animate : function() {
            var that = this;
            function animationFrame(timestamp) {
                if (that.startTime == null) that.startTime = timestamp ;
                that.time = timestamp - that.startTime;
                requestAnimationFrame(animationFrame);
            }
            requestAnimationFrame(animationFrame);
        },
    });
    O2.mixin(psr.view.gameController.Timer, O876.Mixin.Events);
})(jQuery,O2);