/// <reference path="../view.ts" />
/// <reference path="../../template.ts" />

module Prisc {
    export class CaptureView extends View {
        private tpl = new HBSTemplate('capture/main.hbs');
        constructor(public imageURI: string) {
            super();
        }
        render(): CaptureView {
            var img = new Image();
            img.src = this.imageURI;
            this.$el.append(
                this.tpl.render(),
                img
            );
            return this;
        }
    }
}