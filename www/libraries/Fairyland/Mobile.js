O2.createClass('Fairy.Mobile', {
	_shape: null,
	_sprite: null,
	_flight: null,

	flight: function(f) {
		if (this._shape && f !== undefined) {
			this._shape.flight(f);
		}
		return this.prop('_flight', f);
	},

	shape: function(s) {
		if (this._shape) {
			this._shape.flight(this._flight);
		}
		return this.prop('_shape', s);
	}

});



O2.mixin(Fairy.Mobile, O876.Mixin.Data);
O2.mixin(Fairy.Mobile, O876.Mixin.Prop);
