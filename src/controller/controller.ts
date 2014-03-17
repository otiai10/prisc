/// <reference path="../../definitions/chrome/chrome.d.ts" />
module Prisc {
    export class Controller {
        constructor(){}
        init() {
            chrome.browserAction.onClicked.addListener(function(tab){
                console.log(tab);
                alert('hoge');
            });
        }
    }
}
