/// <reference path="../definitions/jquery/jquery.d.ts" />
/// <reference path="./controller/controller.ts" />

$(function(){
    Prisc.main();
});
module Prisc {
    export function main() {
        var controller = new Prisc.Controller();
        controller.init();
    }
}