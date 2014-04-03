/// <reference path="../../definitions/chrome/chrome.d.ts" />
/// <reference path="../../definitions/jquery/jquery.d.ts" />
/// <reference path="../../definitions/showv/showv.d.ts" />
/// <reference path="../model/config/config.ts" />
/// <reference path="../view/sample-view.ts" />
/// <reference path="../util/query.ts" />
/// <reference path="../router/router.ts" />
/// <reference path="../router/message-routes.ts" />

module Prisc {
    export class Controller {
        private static baseURL = 'asset/html/app.html';
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
                if (Config.get('only-capture')) Controller.downloadWithoutEditing(imageURI);
                else Controller.openCaptureViewByImageURI(imageURI);
            });
        }
        private static downloadWithoutEditing(imageURI: string) {
            var dirName = Config.get('download-dir-name'),
                filename = Config.getFileName();
            // 以下、Controller.MessageDownloadImageと一緒なので糞い
            chrome.downloads.download({
                url: imageURI,
                filename: [dirName, filename].join('/')
            },(downloadId: number) => {
                if (! Config.get('show-file-on-download')) return;
                var delay = 250;
                setTimeout(() => {
                    chrome.downloads.show(downloadId);
                }, delay);
            });
            /* インターフェースの維持のためここでControllerでやりたかった
            Controller.sendMessage('DownloadImage',{
                imageURI:imageURI,
                filename: "hoge"
            });
            */
        }
        public static openCaptureViewByImageURI(imageURI: string) {
            var query = new Util.Query({
                view: 'Capture',
                imageURI: imageURI
            });
            Controller.open({
                url: Controller.baseURL + query.toString()
            });
        }
        public static open(params: chrome.tabs.CreateProperties, callback: (tab: any) => any = (tab: any) => {}) {
            chrome.tabs.create(params, (tab) => {
                callback(tab);
            });
        }
        execute(params: Object): any {
            return new SampleView();
        }

        public static sendMessage(purpose: string, params: any = {}, callback: (any) => any = (any) => {}) {
            var message = $.extend({params:params}, {purpose:purpose});
            chrome.runtime.sendMessage(message, (res) => {
                callback(res);
            });
        }
    }
}
