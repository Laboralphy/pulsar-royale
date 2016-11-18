/**
 * Created by florian.saleur on 17/11/16.
 */
(function($, O2) {
    $(function() {
        var $view = $(".view","#main");
        new psr.view.Shop();
        new psr.view.Cards();
        new psr.view.Battle();
        new psr.view.Chat();
        $view.perfectScrollbar();
        $(".init-tabs").addClass("tabs tabs-fixed-width").tabs({
            onShow: function() {
                $view.perfectScrollbar("update");
            }
        });
        $(".init-tabs").tabs('select_tab', 'cards');
    })
})(jQuery, O2);