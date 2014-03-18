
module Prisc {
    export class MessageNotFoundController extends Controller {
        constructor(name: string) {
            super(name);
        }
        execute(params: Object) {
            console.log("purpose `" + this.controllerName + "` not found, with parameters ", params);
        }
    }
}