/// <reference path="../../definitions/jquery/jquery.d.ts" />
/// <reference path="../../definitions/chrome/chrome.d.ts" />
/// <reference path="../controller/controller.ts" />

module Prisc {
    export class ServiceTwitter {
        public static STATUS_MAX_LENGTH: number = 140;
        public static SETTINGS_APPLICATION_URL: string = 'https://twitter.com/settings/applications';
        public static alreadyAuthenticated(): boolean {
            var oauth = chrome.extension.getBackgroundPage()['oauth'];
            return oauth.hasToken();
        }
        public static authenticate(): JQueryPromise<boolean> {
            return Controller.sendMessage("TwitterAuthorize");
        }
        private oauth: any;
        constructor(){
            this.oauth = chrome.extension.getBackgroundPage()['oauth'];
        }
        // Promiseを返したい
        tweetWithImageURI(imageURI: string,
                          type: string,
                          status: string = ''): JQueryPromise<Object> {

            var deferred = $.Deferred();

            var apiUrl = 'https://api.twitter.com/1.1/statuses/update_with_media.json';
            var options = {
                method: "POST",
                parameters: {
                    status: status
                }
            };
            var callback = (response, xhr: XMLHttpRequest) => {
                response = JSON.parse(response);
                if (xhr.status !== 200) deferred.reject(response);
                else deferred.resolve(response);
            };

            var base64imageURI = imageURI;
            var blob: Blob = this.uri2blob(base64imageURI, type);
            // Create FormData
            var formData = new FormData;
            formData.append("media[]", blob);
            // Set it to opt_params.body
            options['body'] = formData;
            this.oauth.sendSignedRequest(
                apiUrl,callback,options
            );
            return deferred.promise();
        }
        // Utilが望ましい
        private uri2blob(uri: string, type: string): Blob {
            var bin = atob(uri);
            var len = bin.length;
            var barr = new Uint8Array(len);
            for(var i = 0; i<len; i++){
                barr[i] = bin.charCodeAt(i);
            }
            //Blobコンストラクタにより1行で記述できるようになった．
            return new Blob([barr.buffer], {type: type});
        }
        public static getPermalinkFromSuccessResponse(response: Object): string {
            var baseURL = 'https://twitter.com';
            var tweetIdStr = response['id_str'];
            var userScreenName = response['user']['screen_name'];
            return [
                baseURL,
                userScreenName,
                'status',
                tweetIdStr
            ].join('/');
        }
    }
}