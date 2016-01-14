/// <reference path="../../../definitions/jquery/jquery.d.ts" />
/// <reference path="../../../definitions/chrome/chrome.d.ts" />
/// <reference path="../message/download-image-controller.ts" />

module Prisc {
    export class ApiDownloadImageController extends MessageDownloadImageController {
        constructor(){
            super();
        }
        execute(params: IDownloadParams) {
            super.execute(params);
        }
    }
}
