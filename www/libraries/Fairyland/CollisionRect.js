O2.extendClass('Fairy.CollisionRect', Fairy.CollisionShape {
	_p1: null,
	_p2: null,

	points: function() {
		var x1 = this._p1.x();
		var x2 = this._p2.x();
		var y1 = this._p1.y();
		var y2 = this._p2.y();
		var p = .add(this.flight().position();
		return [
			(new Fairy.Vector(x1, y1)).add(p),
			(new Fairy.Vector(x2, y1)).add(p),
			(new Fairy.Vector(x2, y2)).add(p),
			(new Fairy.Vector(x1, y2)).add(p)
		];
	},
});

O2.mixin(Fairy.Rect, O876.Mixin.Prop);
