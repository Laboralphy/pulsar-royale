/**
 * @author neo
 */
(function ($, O2) {
    O2.extendClass("psr.view.Chat", "psr.view.Abstract", {

        $zoneTexte: '',
        $inputSend: null,

        __construct: function () {
            this.tabName = 'chat';
            this.icon = '&#xE8CD;';
            this.tabTooltip = 'Chat';
            __inherited();

            this._generateChat().appendTo(this.$content);

        },

        _generateChat: function () {

            var $zoneChat = $('<div class="chat row"></div>');

            this.$zoneTexte = $('<div class="chat-txt s12"></div>');
            this.$inputSend = $('<input class="pr-send-msg" type="text"/>');

            var $inputField = $('<div class="chat-input input-field col s12"></div>').append(this.$inputSend);

            return $zoneChat.html(this.$zoneTexte).append($inputField);
        },

        addBulle: function (sPseudo, sTexte) {
            this.$zoneTexte.append($('<div class="chat-bulle col s10 offset-s1"><b>' + sPseudo + ' dit : </b>' + sTexte + '</div>'));
            return this;
        },

        getInputSend: function() {
            return this.$inputSend;
        },


    });
})(jQuery, O2);