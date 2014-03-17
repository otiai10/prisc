/// <reference path="../../definitions/chrome/chrome.d.ts" />
/// <reference path="../../definitions/showv/showv.d.ts" />
/// <reference path="../views/sample-view.ts" />

module Prisc {
    export class Controller {
        constructor(){}
        init() {
            chrome.browserAction.onClicked.addListener((tab) => {
                var windowId = null;
                var options = {
                    format: 'png'
                };
                this.capture(windowId, options)
            });
        }
        capture(windowId: number, options: chrome.tabs.CaptureVisibleTabOptions) {
            chrome.tabs.captureVisibleTab(windowId, options, (imageURI: string) => {
                this.open({
                    // url:imageURI
                    url: 'asset/html/app.html'
                });
            });
        }
        open(params: chrome.tabs.CreateProperties, callback: (tab: any) => any = (tab: any) => {}) {
            chrome.tabs.create(params, (tab) => {
                callback(tab);
            });
        }
        execute(): showv.View {
            return new SampleView();
        }
    }
}
