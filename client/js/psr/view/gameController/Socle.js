(function($, O2) {
    O2.createClass("psr.view.gameController.Socle", {

        $energy : null,

        $socle  : null,
        $next   : null,
        $cards  : null,

        __construct : function() {
            this.$socle = $('<div class="row">');
            this.$next = $('<div class="col s2 next">').appendTo(this.$socle);
            this.$cards = $('<div class="col s10" id="socle">').appendTo(this.$socle);

            this.energy = new psr.view.gameController.Energy();
        }
    });
    O2.mixin(psr.view.gameController.Socle, O876.Mixin.Events);
})(jQuery,O2);