/// <reference path="../../definitions/chrome/chrome.d.ts" />
/// <reference path="../../definitions/showv/showv.d.ts" />
/// <reference path="../view/sample-view.ts" />
/// <reference path="../util/query.ts" />
/// <reference path="../router/router.ts" />
/// <reference path="../router/message-routes.ts" />

module Prisc {
    export class Controller {
        private baseURL = 'asset/html/app.html';
        constructor(public controllerName: string = ""){}
        init() {
            chrome.browserAction.onClicked.addListener((tab) => {
                var windowId = null;
                var options = {
                    format: 'png'
                };
                this.capture(windowId, options)
            });
            chrome.runtime.onMessage.addListener((messageObj: Object, sender: any, sendResponse: (any) => any) => {
                var message = Message.factory(messageObj);
                Router.message(message);
            });
        }
        capture(windowId: number, options: chrome.tabs.CaptureVisibleTabOptions) {
            chrome.tabs.captureVisibleTab(windowId, options, (imageURI: string) => {
                var query = new Util.Query({
                    view: 'Capture',
                    imageURI: imageURI
                });
                this.open({
                    url: this.baseURL + query.toString()
                });
            });
        }
        open(params: chrome.tabs.CreateProperties, callback: (tab: any) => any = (tab: any) => {}) {
            chrome.tabs.create(params, (tab) => {
                callback(tab);
            });
        }
        execute(params: Object): any {
            return new SampleView();
        }
    }
}
