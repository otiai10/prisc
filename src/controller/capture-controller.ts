/// <reference path="./controller.ts" />
/// <reference path="../views/capture/view.ts" />

module Prisc {
    export class CaptureController extends Controller {
        constructor(){
            super();
        }
        execute(params: Object) {
            return new CaptureView();
        }
    }
}