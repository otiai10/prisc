
module Prisc {
    export class MessageDownloadImageController extends Controller {
        constructor() {
            super();
        }
        execute(params: Object) {
            chrome.downloads.download({
                url: params['imageURI']
            });
        }
    }
}