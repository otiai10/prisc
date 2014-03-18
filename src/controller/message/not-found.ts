
module Prisc {
    export class MessageNotFoundController extends Controller {
        constructor() {
            super();
        }
        execute(params: Object) {
            console.log("purpose `" + this.controllerName + "` not found, with parameters ", params);
        }
    }
}