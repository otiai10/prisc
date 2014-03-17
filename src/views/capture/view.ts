/// <reference path="../view.ts" />
/// <reference path="../../template.ts" />

module Prisc {
    export class CaptureView extends View {
        private tpl = new HBSTemplate('capture/main.hbs');
        constructor() {
            super();
        }
        render(): CaptureView {
            this.$el.append(
                this.tpl.render()
            );
            return this;
        }
    }
}