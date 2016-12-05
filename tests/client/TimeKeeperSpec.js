describe('psr.TimeKeeper :', function() {
    var timerCallBack;

    var o = new psr.TimeKeeper();
    it('startTime and time is defined', function() {
        expect(o.startTime).toBeDefined();
        expect(o.time).toBeDefined();
    });
    describe('psr.TimeKeeper Events', function() {
        it('trigger nextFrame', function(done) {
            o.on('nextFrame', function() {
                done();
            });
        });
    })
});