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
var oauth = chrome.extension.getBackgroundPage()['oauth'] || ChromeExOAuth.initBackgroundPage({
    'request_url': "https://api.twitter.com/oauth/request_token",
    'authorize_url':   "https://api.twitter.com/oauth/authorize",
    'access_url':   "https://api.twitter.com/oauth/access_token",
    'consumer_key':                      "6AsP5LGXgbFHiLqxzM4ZcQ",
    'consumer_secret':"gAvtZfpNkEAuo8gjodD2Mr20fVMQLFl0f3VUQQxpTc"
});
module Prisc {
    export var drawingContext = new DrawingContext();
    export function main() {
        var controller = new Prisc.Controller();
        controller.init();
    }
}