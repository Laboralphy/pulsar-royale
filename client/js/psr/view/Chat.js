/**
 * @author neo
 */
(function($, O2) {
    O2.extendClass("psr.view.Chat","psr.view.Abstract", {
        __construct : function() {
            this.tabName = 'chat';
            this.icon = '&#xE8CD;';
            this.tabTooltip = 'Chat';
            __inherited();

            this.$
            // Zone de chat
            var $chat = $('<div class="chat"></div>');

            // Zone de texte
            var $txt = $('<div class="chat-txt row"></div>');

            // Bulle de chat
            var $bulle = $('<div class="chat-bulle col s12"><b>Neo dit:</b> Bonjour</div>');
            // Input
            var $input = $('<div class="chat-input input-field col s12"><input type="text"/></div>');

            $chat.html($txt.html($bulle).append($input)).appendTo(this.$content);

        }



    });
})(jQuery,O2);