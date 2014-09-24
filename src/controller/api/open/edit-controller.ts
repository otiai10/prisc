/// <reference path="../../../../definitions/jquery/jquery.d.ts" />
/// <reference path="../../../../definitions/chrome/chrome.d.ts" />
/// <reference path="../../controller.ts" />

module Prisc {
    export class ApiOpenEditController extends Controller {
        constructor(){
            super();
        }
        execute(params: Object): JQueryPromise<boolean> {
            console.log("[009]", "in ApiOpenEditController.execute", params);
            var deferred = $.Deferred();
            var imgURI = params['imgURI'];
            console.log("[010]", "In ApiOpenEditController", params);
            if (! imgURI) window.alert("ImageURI is not defined!\n" + JSON.stringify(params));
            Controller.openCaptureViewByMessagingUrl(imgURI);
            return deferred.promise();
        }
    }
}
