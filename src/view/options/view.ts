/// <reference path="../../../definitions/chrome/chrome.d.ts" />
/// <reference path="../../controller/controller.ts" />
/// <reference path="../view.ts" />
/// <reference path="../template.ts" />
/// <reference path="./header-view.ts" />
/// <reference path="./contents/view.ts" />
/// <reference path="./footer-view.ts" />

module Prisc {
    export class OptionsView extends View {
        private headerView: OptionHeaderView;
        private contentsView: OptionContentsView;
        private footerView: OptionFooterView;
        public title: string = "設定"
        constructor() {
            super({
                className: 'static-page-wrapper'
            });
            this.headerView = new OptionHeaderView();
            this.contentsView = new OptionContentsView();
            this.footerView = new OptionFooterView();
        }
        render(): OptionsView {
            this.$el.append(
                this.headerView.render().$el,
                this.contentsView.render().$el,
                '<button id="authorize">auth</button>',
                '<button id="tweet">tweet</button>',
                '<input type="file" id="myFile" />',
                this.footerView.render().$el
            );
            return this;
        }
        events(): Object {
            return {
                'click #authorize': 'auth',
                'click #tweet': 'tweet'
            }
        }
        auth() {
            Controller.sendMessage("TwitterAuthorize");
            window.close();
        }
        tweet() {
            var oauth = chrome.extension.getBackgroundPage()['oauth'];
            // var apiUrl = 'https://api.twitter.com/1.1/statuses/update.json';
            var apiUrl = 'https://api.twitter.com/1.1/statuses/update_with_media.json';
            var options = {
                method: "POST",
                parameters: {
                    status: String(Date.now()) + "にほんご"
                },
                headers: {
                    'Content-Transfer-Encoding': 'BASE64'
                }
            };
            // Get File Object
            var file = document.querySelector('#myFile')['files'][0];
            // Create FormData
            var formData = new FormData;
            formData.append("media[]", file);
            // Set it to opt_params.body
            options['body'] = formData;
            var callback = (response, xhr) => {
                console.log(JSON.parse(response));
            };
            oauth.sendSignedRequest(
                apiUrl,callback,options
            );
        }
    }
}