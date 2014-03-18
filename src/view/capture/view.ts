/// <reference path="../view.ts" />
/// <reference path="../template.ts" />
/// <reference path="./canvas-view.ts" />

module Prisc {
    export class CaptureView extends View {
        private tpl = new HBSTemplate('capture/main.hbs');
        public title: string;
        public canvasView: CanvasView;
        constructor(public imageURI: string) {
            super();
            var d = new Date();
            this.title = d.toLocaleTimeString();
            this.canvasView = new Prisc.CanvasView(this.imageURI);
        }
        render(): CaptureView {
            this.$el.append(
                this.tpl.render({
                    title: this.title
                }),
                this.canvasView.render().$el
            );
            return this;
        }
    }
}