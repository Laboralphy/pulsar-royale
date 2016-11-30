(function ($, O2) {
    O2.createClass("psr.ChatController", {

        oSocket: null,

        __construct: function () {


        },

		
		initSocket: function(oSocket) {
			this.oSocket = oSocket;
			
			
			// si le serveur fait oSocket.emit("PERMIER_MESSAGE", { toto: 'param1' });
			// cela déclenchera cette fonction ci-après. (avec data = { toto: 'param1' });
			oSocket.on('PREMIER_MESSAGE', function(data) {
			});
		}


    });
    O2.mixin(psr.ChatController, O876.Mixin.Events);
})(jQuery, O2);
