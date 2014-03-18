/// <reference path="../controller.ts" />

module Prisc {
    export class QueryNotFoundController extends Controller {
        constructor() {
            super();
        }
        execute(params: any) {
            var message = "query `?view=" + this.controllerName + "` not found, with parameters ", params;
            console.log(message);
            // FIXME: とりあえずアラート
            alert(message);
        }
    }
}