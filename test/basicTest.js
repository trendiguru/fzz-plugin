let Nightmare = require('nightmare');
let expect = require('chai').expect; // jshint ignore:line
let runBasicTest = require('./src/nightmare.js');
let {
    INJECTED_FILES,
    URLS,
    TEST_TIMEOUT,
    RESULTS_SRC
} = require('./constants.js');

describe('BASIC FZZ_PLUGIN TEST', function() {
    describe('manual injection of snippet', function() {
        this.timeout(TEST_TIMEOUT);
        it('should return true if the test is rightfull otherwise false', function(done) {
            runBasicTest(URLS.potential, null).then((res) => {
                console.log('session results:');
                console.log(res);
                for (let url in res) {
                    describe(url+' results source test', function() {
                        this.timeout(TEST_TIMEOUT);
                        it('should return true if sorce of the results is rightfull otherwise false', function(done) {
                            expect(res[url].productSource).to.equal(RESULTS_SRC);
                            done();
                        });
                    });
                }
                done();
            }, done);
        });
    });
});
