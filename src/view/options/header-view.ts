/// <reference path="../../../definitions/chrome/chrome.d.ts" />
/// <reference path="../view.ts" />
/// <reference path="../template.ts" />

module Prisc {
    export class OptionHeaderView extends View {
        constructor() {
            super();
        }
        render(): OptionHeaderView {
            this.$el.append(
                '<h1>This is options HEADER</h1>'
            );
            return this;
        }
    }
}