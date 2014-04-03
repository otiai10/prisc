/// <reference path="./../controller.ts" />
/// <reference path="../../view/options/view.ts" />

module Prisc {
    export class OptionsController extends Controller {
        constructor(){
            super();
        }
        execute(params: Object) {
            return new OptionsView();
        }
    }
}