/**
 * @author neo
 */
(function($, O2) {
    O2.extendClass("psr.view.Chat","psr.view.Abstract", {

        $zoneTexte: '',

        __construct : function() {
            this.tabName = 'chat';
            this.icon = '&#xE8CD;';
            this.tabTooltip = 'Chat';
            __inherited();

            oChat = new chat();
            oChat.init();

            this._generateChat().appendTo(this.$content);
            this.addBulle('Neo', 'Bonjour');
            this.addBulle('Fred', 'Bonjour ^^ dcsjkfjskfjklsdjflksjdlkfjklsdjflkjsdlkfjlksdjfkljsdlkfjlksdjflksjdlk');

        },

        _generateChat:  function () {

            // Zone de chat
            var $zoneChat = $('<div class="chat row"></div>');
            // Zone de texte
            this.$zoneTexte = $('<div class="chat-txt s12"></div>');
            // Input
            var $input = $('<div class="chat-input input-field col s12"><input type="text"/></div>');

            return $zoneChat.html(this.$zoneTexte).append($input);
        },

        addBulle: function (sPseudo, sTexte) {
            this.$zoneTexte.append($('<div class="chat-bulle col s10 offset-s1"><b>' + sPseudo +' dit : </b>'+ sTexte + '</div>'));
            return this;
        },

    });
})(jQuery,O2);