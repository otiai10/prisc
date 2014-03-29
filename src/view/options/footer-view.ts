/// <reference path="../../../definitions/chrome/chrome.d.ts" />
/// <reference path="../view.ts" />
/// <reference path="../template.ts" />

module Prisc {
    export class OptionFooterView extends View {
        constructor() {
            super();
        }
        render(): OptionFooterView {
            this.$el.append(
                '<h1>This is options FOOTER</h1>'
            );
            return this;
        }
    }
}