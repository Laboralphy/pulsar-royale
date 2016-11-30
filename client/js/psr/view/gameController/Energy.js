(function($, O2) {
    O2.createClass("psr.view.gameController.Energy", {

        $energy : null,
        $jauge  : null,
        $lvl    : null,
        $value  : null,

        lastTs  : null,
        percent : 0,
        speed   : 1,
        value   : 0,

        __construct : function() {
            this.$jauge = $('<div class="jauge"><img src="svg/lightning.svg" /></div>');
            this.$lvl = $('<div class="lvl"></div>').prependTo(this.$jauge);
            this.$value = $('<div class="val">0</div>').appendTo(this.$jauge);
            this.$energy = $('<div class="energy"></div>').append(this.$jauge);
            this.$grid = $('<table class="grid">').appendTo(this.$jauge);
            var $tr = $('<tr>').appendTo(this.$grid);
            for (var i = 0; i < 10; i++) {
                $('<td>').appendTo($tr);
            }
        },
        setTime : function(timestamp) {
            var that = this;
            if (that.lastTs == null) that.lastTs = timestamp ;
            if (that.percent < 100) {
                that.$lvl.removeClass('full');
                that.percent += (timestamp - that.lastTs) / (120 / that.speed);
                that.percent = Math.min(100,that.percent);
                that.$lvl.css('width',that.percent+'%');
                var val = Math.floor(that.percent / 10);
                if (that.value != Math.floor(that.percent / 10)) {
                    that.setEnergy(val);
                }
            } else {
                that.$lvl.addClass('full');
            }
            that.lastTs = timestamp;
            return this;
        },
        removeEnergy: function(en) {
            if (this.value >= en) {
                var val = this.value - en;
                this.percent -= en * 10;
                this.setEnergy(val);
            } else {
                throw "Pas assez d'énergie...";
            }
            return this;
        },
        setEnergy : function(en) {
            this.value = en;
            this.$value.text(en);
            return this;
        }
    });
    O2.mixin(psr.view.gameController.Energy, O876.Mixin.Events);
})(jQuery,O2);