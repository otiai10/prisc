
module Prisc {
    export class MessageChangeFontValueController extends Controller {
        constructor() {
            super();
        }
        execute(params: Object) {
            Prisc.drawingContext.updateFontValue(params['fontValue']);
        }
    }
    export class MessageChangeFontSizeController extends Controller {
        constructor() {
            super();
        }
        execute(params: Object) {
            Prisc.drawingContext.updateFontSize(params['fontSize']);
        }
    }
    export class MessageChangeFontFamilyController extends Controller {
        constructor() {
            super();
        }
        execute(params: Object) {
            Prisc.drawingContext.updateFontFamily(params['fontFamily']);
        }
    }
}