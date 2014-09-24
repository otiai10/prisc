/// <reference path="../../definitions/chrome/chrome.d.ts" />
/// <reference path="../../definitions/jquery/jquery.d.ts" />
/// <reference path="../../definitions/showv/showv.d.ts" />
/// <reference path="../model/config/config.ts" />
/// <reference path="../view/sample-view.ts" />
/// <reference path="../util/query.ts" />
/// <reference path="../router/router.ts" />
/// <reference path="../router/message-routes.ts" />
/// <reference path="../router/api-routes.ts" />

module Prisc {
    // 本当はURLの中で?imageURI=xxxxxxとしてメッセージングしたいが
    // too long URL 制限がかかってバグる
    export var capturedImageURI: string;
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
            console.log("[000]", "before onMessageExternal");
            chrome.runtime.onMessageExternal.addListener(
                (messageObj: Object, sender: any, sendResponse: (any) => any) => {
                    console.log("[001]", "onMessageExternal fired", messageObj, sender);
                    var called = Call.factory(messageObj);
                    console.log("[002]", "call constructed", called);
                    Router.callAPI(called);
            });
        }
        capture(windowId: number, options: chrome.tabs.CaptureVisibleTabOptions) {
            chrome.tabs.captureVisibleTab(windowId, options, (imageURI: string) => {
                if (Config.get('only-capture')) Controller.downloadWithoutEditing(imageURI);
                else Controller.openCaptureByMessagingBackgroundPage(imageURI);
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
        public static openCaptureByMessagingBackgroundPage(imageURI: string) {
            var query = new Util.Query({
                view: 'Capture'
                // `too long url`
                // imageURI: imageURI
            });
            Prisc.capturedImageURI = imageURI;
            Controller.open({
                url: Controller.baseURL + query.toString()
            });
        }
        public static openCaptureViewByMessagingUrl(imageURI: string) {
            console.log("[011]", "openCaptureViewByMessagingUrl", imageURI);
            var query = new Util.Query({
                view: 'Capture',
                imageURI: imageURI
            });
            console.log("[012]", "openCaptureViewByMessagingUrl", query, query.toString());
            Controller.open({
                url: Controller.baseURL + query.toString()
            });
        }
        public static open(params: chrome.tabs.CreateProperties, callback: (tab: any) => any = (tab: any) => {}) {
            console.log("[013]", "open", params);
            chrome.tabs.create(params, (tab) => {
                console.log("[014]", "chrome.tab.create created", tab);
                callback(tab);
            });
        }
        execute(params: Object): any {
            return new SampleView();
        }

        // TODO: callback使ってる場所があるか確認し、Promiseに統一
        public static sendMessage(purpose: string, params: any = {}, callback: (any) => any = (any) => {}): JQueryPromise<any> {
            var deferred = $.Deferred();
            var message = $.extend({params:params}, {purpose:purpose});
            chrome.runtime.sendMessage(message, (res) => {
                callback(res);
                deferred.resolve(res);
            });
            return deferred.promise();
        }
    }
}
