/**
 * Created by florian.saleur on 18/11/16.
 */
(function($, O2) {
    O2.extendClass("psr.view.Battle" ,"psr.view.Abstract", {
        inQueue : false,

        $findGameButton : null,

        __construct : function() {
            this.tabName = 'battle';
            this.title = 'Au combat !';
            this.icon = '&#xE8D3;';
            this.tabTooltip = 'Fight !';
            __inherited();
            this.$content.addClass('center-align');
            this.makeLauncher();
        },
        makeLauncher : function() {
            var that = this;
            that.$findGameButton = $('<a class="waves-effect waves-light btn-large">Combattre</a>')
            this.$content.append(that.$findGameButton);
            that.$findGameButton.on('click', function() {
                that.ioMatchmaking();
            });
        },
        ioMatchmaking : function() {
            var that = this;
            if (that.inQueue) {
                that.trigger('leaveMatchmaking');
            } else {
                that.trigger('enterMatchmaking');
            }
            that.toggleInQueue();
        },
        toggleInQueue : function() {
            var that = this;
            if (that.inQueue) {
                that.$findGameButton
                    .removeClass('red')
                    .text('Combattre');
            } else {
                that.$findGameButton
                    .addClass('red')
                    .text('Recherche...');
            }
            that.inQueue = !that.inQueue;
        }
    });
    O2.mixin(psr.view.Battle, O876.Mixin.Events);
})(jQuery,O2);