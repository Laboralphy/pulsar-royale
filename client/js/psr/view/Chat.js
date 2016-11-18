/**
 * Created by florian.saleur on 18/11/16.
 */
(function($, O2) {
    O2.extendClass("psr.view.Chat","psr.view.Abstract", {
        __construct : function() {
            this.tabName = 'chat';
            this.title = 'Bla bla bla';
            this.icon = '&#xE8CD;';
            this.tabTooltip = 'Chat';
            __inherited();
        }
    });
})(jQuery,O2);