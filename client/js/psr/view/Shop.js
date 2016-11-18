/**
 * Created by florian.saleur on 18/11/16.
 */
(function($, O2) {
    O2.extendClass("psr.view.Shop","psr.view.Abstract", {
        __construct : function() {
            this.tabName = 'shop';
            this.title = 'Pas de pay to win ici !';
            this.icon = '&#xE8CC;';
            this.tabTooltip = 'Pas de pay to win ici !';
            __inherited();
        }
    });
})(jQuery,O2);