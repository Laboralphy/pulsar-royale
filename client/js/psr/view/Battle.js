/**
 * Created by florian.saleur on 18/11/16.
 */
(function($, O2) {
    O2.extendClass("psr.view.Battle" ,"psr.view.Abstract", {
        __construct : function() {
            this.tabName = 'battle';
            this.title = 'Au combat !';
            this.icon = '&#xE8D3;';
            this.tabTooltip = 'Fight !';
            __inherited();
        }
    });
})(jQuery,O2);