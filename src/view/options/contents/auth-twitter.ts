/// <reference path="../../../../definitions/jquery/jquery.d.ts" />
/// <reference path="../../../../definitions/chrome/chrome.d.ts" />
/// <reference path="../../../model/config/config.ts" />
/// <reference path="./download-dir-name-view.ts" />
/// <reference path="../../template.ts" />
/// <reference path="../../../service/twitter.ts" />

module Prisc {
    export class AuthTwitterView extends ConfigCheckboxInputView {
        constructor(){
            super({
                title: "ツイッター連携",
                description: "tweetボタンを表示し、直接投稿できるようにします",
                name: "auth-twitter"
            });
        }
        // override
        renderInputArea(): string {
            var tpl = new HBSTemplate("options/contents/checkbox-input.hbs");
            var checked: string = '';
            if (Config.get(this.name) && ServiceTwitter.alreadyAuthenticated()) {
                checked = 'checked';
            } else {
                Config.set(this.name, false);
            }
            return tpl.render({
                checked: checked
            });
        }
        saveCheckbox(ev: JQueryEventObject) {
            super.saveCheckbox(ev);
            if (! ev.currentTarget['checked']) {
                this.suggestCancelApplication();
                return;
            }
            var promise: JQueryPromise<boolean> = ServiceTwitter.authenticate();
            promise.done((res: boolean) => {
                Config.set(this.name, true);
                window.focus();
            });
            promise.fail((res: boolean) => {
                Config.set(this.name, false);
            });
        }
        suggestCancelApplication() {
            // 破棄する
            var oauth = chrome.extension.getBackgroundPage()['oauth'];
            oauth.clearTokens();

            var message = "ツイッター連携を止める場合は、";
            message += "ツイッターの設定からアプリケーション連携を取り消すことをオススメします。\n";
            message += "[developer] https://twitter.com/otiai10";
            if (window.confirm(message)) {
               location.href = ServiceTwitter.SETTINGS_APPLICATION_URL;
            }
        }
    }
}