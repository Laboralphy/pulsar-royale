QUnit.module('Vector2D');

QUnit.test('Basic', function(assert) {
	var v = new Fairy.Vector2D();
	assert.ok('x' in Fairy.Vector2D.prototype, 'mixin property worked');
	assert.ok('x' in v, 'mixin property are in instances');
	assert.equal(v.x(), 0);
	assert.equal(v.y(), 0);
	v.x(10).y(20);
	assert.equal(v.x(), 10);
	assert.equal(v.y(), 20);
	var v2 = new Fairy.Vector2D(v);
	assert.equal(v.x(), 10);
	assert.equal(v.y(), 20);
	assert.notEqual(v, v2);
});


QUnit.test('Operations', function(assert) {
	var v1 = new Fairy.Vector2D(10, 20);
	var v2 = new Fairy.Vector2D(100, 200);
	
	var v0 = v1.clone();
	
	v1.add(v2);
	assert.equal(v1.x(), 110);
	assert.equal(v1.y(), 220);
	
	v1.assign(v0);
	v1.mul(2);
	assert.equal(v1.x(), 20);
	assert.equal(v1.y(), 40);
	
	v1.assign(v0);
	v1.div(2);
	assert.equal(v1.x(), 5);
	assert.equal(v1.y(), 10);
	
	v1.assign(v0);
	v1.sub(v2);
	assert.equal(v1.x(), -90);
	assert.equal(v1.y(), -180);
	
	
	assert.equal(v1.x(1).y(0).distance(), 1);
	assert.equal(v1.x(0).y(1).distance(), 1);

	assert.equal(v1.x(1000).y(1000).distance() | 0, Math.sqrt(2) * 1000 | 0);
	
});
