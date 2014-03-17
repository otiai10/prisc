/// <reference path="../view.ts" />
/// <reference path="../../template.ts" />

module Prisc {
    export class CaptureView extends View {
        private tpl = new HBSTemplate('capture/main.hbs');
        public title: string;
        constructor(public imageURI: string) {
            super();
            var d = new Date();
            this.title = d.toLocaleTimeString();
        }
        render(): CaptureView {
            var img = new Image();
            img.src = this.imageURI;
            this.$el.append(
                this.tpl.render({
                    title: this.title
                }),
                img
            );
            return this;
        }
    }
}