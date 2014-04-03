/// <reference path="../../../definitions/chrome/chrome.d.ts" />
/// <reference path="../view.ts" />
/// <reference path="../template.ts" />

module Prisc {
    export class OptionFooterView extends View {
        private tpl = new HBSTemplate("options/footer.hbs");
        constructor() {
            super({
                className: "options-footer"
            });
        }
        render(): OptionFooterView {
            this.$el.append(
                this.tpl.render()
            );
            return this;
        }
    }
}