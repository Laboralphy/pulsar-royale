O2.createClass('Fairy.Vector2D', {
	_x: 0,
	_y: 0,
	
	__construct: function(x, y) {
		if (x !== undefined) {
			if (y === undefined) {
				this.x(x._x).y(x._y);
			} else {
				this._x = x
				this._y = y;
			}
		}
	},
	
	assign: function(v) {
		this.x(v.x()).y(v.y());
	},
	
	add: function(v) {
		return this.x(this._x + v._x).y(this._y + v._y);
	},

	sub: function(v) {
		return this.x(this._x - v._x).y(this._y - v._y);
	},

	mul: function(n) {
		return this.x(this._x * n).y(this._y * n);
	},
  
	div: function(n) {
		if (n !== 0) {
			return this.x(this._x / n).y(this._y / n);
		} else {
			throw new Error('division by 0');
		}
		return this;
	},
  
	clone: function() {
		return new Fairy.Vector2D(this);
	},
  
	distance: function() {
		return Math.sqrt(this._x * this._x + this._y * this._y);
	},

	normalize: function() {
		return this.div(this.distance());
	}
});



O2.mixin(Fairy.Vector2D, O876.Mixin.Prop);
