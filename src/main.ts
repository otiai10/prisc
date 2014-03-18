/// <reference path="../definitions/jquery/jquery.d.ts" />
/// <reference path="./controller/controller.ts" />
/// <reference path="model/drawing-context.ts" />

$(function(){
    Prisc.main();
});
module Prisc {
    export var drawingContext = new DrawingContext();
    export function main() {
        var controller = new Prisc.Controller();
        controller.init();
    }
}