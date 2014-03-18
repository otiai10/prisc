/// <reference path="./../controller.ts" />
/// <reference path="../../view/capture/view.ts" />

module Prisc {
    export class CaptureController extends Controller {
        constructor(){
            super();
        }
        execute(params: Object) {
            return new CaptureView(params['imageURI']);
        }
    }
}