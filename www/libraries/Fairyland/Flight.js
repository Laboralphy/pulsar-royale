O2.createClass('Fairy.Flight', {
	_position: null,

	__construct: function() {
		this._position = new Fairy.Vector(0, 0);
	},

	move: function(v) {
		this._position.trans(v);
	}
});


O2.mixin(Fairy.Flight, O876.Mixin.Prop);
