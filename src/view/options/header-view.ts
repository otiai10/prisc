/// <reference path="../../../definitions/chrome/chrome.d.ts" />
/// <reference path="../view.ts" />
/// <reference path="../template.ts" />

module Prisc {
    export class OptionHeaderView extends View {
        private tpl = new HBSTemplate("options/header.hbs");
        constructor() {
            super();
        }
        render(): OptionHeaderView {
            this.$el.append(
                this.tpl.render()
            );
            return this;
        }
    }
}