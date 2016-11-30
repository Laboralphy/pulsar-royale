O2.createClass("psr.Chat", {

	oSocket: null,
	oView: null,
	
	
	initView: function(oView) {
		this.oView = oView;
	},
	
	initSocket: function(oSocket) {
		this.oSocket = oSocket;
		

		oSocket.on('XXXXX', (function(data) {
			this.oView.afficher_quelquechose();
			// oSocket.emit('YYYY', {...});
		}).bind(this));
	},
});
