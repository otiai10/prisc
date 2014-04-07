/// <reference path="../../../../definitions/jquery/jquery.d.ts" />
/// <reference path="../../../../definitions/chrome/chrome.d.ts" />
/// <reference path="../../controller.ts" />

module Prisc {
    export class MessageTwitterAuthorizeController extends Controller {
        constructor(){
            super();
        }
        execute(params: Object): JQueryPromise<boolean> {
            var oauth = chrome.extension.getBackgroundPage()['oauth'];
            // 一度破棄する
            oauth.clearTokens();

            var deferred = $.Deferred();
            oauth.authorize((apiAccessToken) => {
                if (apiAccessToken) deferred.resolve(true);
                else deferred.reject(false);
            });
            return deferred.promise();
        }
    }
}