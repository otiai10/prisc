/// <reference path="../../../../definitions/chrome/chrome.d.ts" />
/// <reference path="../../view.ts" />
/// <reference path="../../template.ts" />

module Prisc {
    export class OptionContentsView extends View {
        constructor() {
            super();
        }
        render(): OptionContentsView {
            this.$el.append(
                '<h1>This is options Contents</h1>'
            );
            return this;
        }
    }
}