/// <reference path="../../definitions/mocha/mocha.d.ts" />
/// <reference path="../../definitions/chai/chai.d.ts" />
/// <reference path="../../src/service/twitter.ts" />

module Spec {

    chai.should();

    describe('ServiceTwitter', () => {
        it('should be true', () => {
            true.should.be.false;
        });
    });  
}
