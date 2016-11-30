(function($, O2) {
    O2.createClass("psr.view.gameController.Grid", {
        $grid   : null,

        _gridHeight : 30,
        _gridWidth  : 18,

        __construct : function() {
            this.$grid = $('<table class="gameController">');
            var $tr, $td;
            for (var h = 0; h < this._gridHeight; h++) {
                $tr = $('<tr>').appendTo(this.$grid);
                for (var w = 0; w < this._gridWidth; w++) {
                    $td = $('<td data-x="'+ h +'" data-y="'+ w +'">').appendTo($tr);
                    if (h > (this._gridHeight / 2)) {
                        $td.addClass('available')
                    }
                }
            }
        }
    });
    O2.mixin(psr.view.gameController.Grid, O876.Mixin.Events);
})(jQuery,O2);