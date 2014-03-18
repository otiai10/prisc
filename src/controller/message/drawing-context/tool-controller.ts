
module Prisc {
    export class MessageChangeToolController extends Controller {
        constructor() {
            super();
        }
        execute(params: Object) {
            Prisc.drawingContext.updateTool(params['toolName']);
        }
    }
}