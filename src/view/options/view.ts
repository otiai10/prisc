/// <reference path="../../../definitions/chrome/chrome.d.ts" />
/// <reference path="../view.ts" />
/// <reference path="../template.ts" />

module Prisc {
    export class OptionsView extends View {
        private tpl = new HBSTemplate('options/main.hbs');
        public title: string = "設定 - Prisc!"
        constructor() {
            super();
        }
        render(): OptionsView {
            this.$el.append(
                '<h1>hogeeee</h1>'
            );
            return this;
        }
    }
}