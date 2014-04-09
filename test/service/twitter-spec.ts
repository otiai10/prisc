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

    describe('Sample0', () => {
        it('ほげえええええ', () => {
            true.should.be.false;
        });
    });
}
