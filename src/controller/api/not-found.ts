/// <reference path="../controller.ts" />

module Prisc {
    export class ApiNotFoundController extends Controller {
        constructor(name: string) {
            super(name);
        }
        execute(params: Object) {
            console.log("API path for `" + this.controllerName + "` not found, with parameters ", params);
        }
    }
}