
module Prisc {
    export class MessageChangeColorController extends Controller {
        constructor() {
            super();
        }
        execute(params: Object) {
            Prisc.drawingContext.updateColor(params['colorCode']);
        }
    }
}