/// <reference path="../../definitions/mocha/mocha.d.ts" />
/// <reference path="../../definitions/chai/chai.d.ts" />
/// <reference path="../../src/service/twitter.ts" />

module Spec {

    chai.should();

    describe('ServiceTwitter', () => {
        it('should be true', () => {
            true.should.be.true;
        });
    });  

    describe('Sample00', () => {
        it('should be fail on purpose', () => {
            true.should.be.false;
        });
    });

    describe('Sample01', () => {
        it('should be success on purpose', () => {
            true.should.be.true;
        });
    });
}
