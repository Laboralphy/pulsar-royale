/**
 * Created by florian.saleur on 18/11/16.
 */
(function($, O2) {
    var $viewWrapper = $('.view','#main');
    var $tabsWrapper = $('.init-tabs','#main');
    O2.createClass("psr.view.Abstract", {
        $tab    : null,
        $view   : null,
        $title  : null,
        $content: null,

        tabName : '',
        title   : '',
        icon    : '',
        tabTooltip : '',

        __construct : function() {
            this.$view = $('<div class="col m12">').appendTo($('<div id="'+ this.tabName +'" class="row">').appendTo($viewWrapper));
            if (this.title) {
                this.$title = $('<div class="card black white-text"><div class="card-title"><h3>'+ this.title +'</h3></div></div>').appendTo(this.$view);
            }
            this.$content = $('<div class="content">').appendTo(this.$view);

            this.$tab = $('<li class="tab col s3 tooltipped" data-position="top" data-tooltip="'+ this.tabTooltip +'"><a href="#'+ this.tabName +'"><i class="material-icons" >'+ this.icon +'</i></a></li>').appendTo($tabsWrapper);
            this.$tab.tooltip();
        }

    });
})(jQuery,O2);