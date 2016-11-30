(function($, O2) {
    O2.createClass("psr.TimeKeeper", {
        startTime   : null,
        time        : null,
        __construct : function() {
            this.init();
        },
        init : function() {
            var that = this;
            function animationFrame(timestamp) {
                if (that.startTime == null) that.startTime = timestamp;
                that.time = timestamp - that.startTime;
                that.trigger("nextFrame", {
                    startTime   : that.startTime,
                    time        : that.time
                });
                if (that.time > 120000) {
                    that.trigger("hurryUp");
                }
                if (that.time > 180000) {
                    that.trigger("mortSubite");
                }
                if (that.time > 360000) {
                    that.trigger("timeIsUp");
                }
                requestAnimationFrame(animationFrame);
            }
            requestAnimationFrame(animationFrame);
        }
    });
    O2.mixin(psr.TimeKeeper, O876.Mixin.Events);
})(jQuery,O2);