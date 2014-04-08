/// <reference path="../definitions/jquery/jquery.d.ts" />
/// <reference path="../definitions/chrome/chrome.d.ts" />
/// <reference path="./controller/controller.ts" />
/// <reference path="model/drawing-context.ts" />
chrome.runtime.onInstalled.addListener(() => {
    Prisc.main();
});
chrome.runtime.onStartup.addListener(() => {
    Prisc.main();
});
declare module ChromeExOAuth {
    export function initBackgroundPage(any): any;
}
declare module Const {
    export var twitter_consumer_key: string;
    export var twitter_consumer_secret: string;
}
var oauth = chrome.extension.getBackgroundPage()['oauth'] || ChromeExOAuth.initBackgroundPage({
    'request_url': "https://api.twitter.com/oauth/request_token",
    'authorize_url':   "https://api.twitter.com/oauth/authorize",
    'access_url':   "https://api.twitter.com/oauth/access_token",
    'consumer_key': Const.twitter_consumer_key,
    'consumer_secret': Const.twitter_consumer_secret
});
module Prisc {
    export var drawingContext = new DrawingContext();
    export function main() {
        var controller = new Prisc.Controller();
        controller.init();
    }
}