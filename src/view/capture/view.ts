/// <reference path="../view.ts" />
/// <reference path="../template.ts" />
/// <reference path="./canvas-view.ts" />
/// <reference path="./context-selector/color-selector-view.ts" />

module Prisc {
    export class CaptureView extends View {
        private tpl = new HBSTemplate('capture/main.hbs');
        public title: string;
        public canvasView: CanvasView;
        public colorSelectorView: ContextColorSelectorView;
        constructor(public imageURI: string) {
            super();
            var d = new Date();
            this.title = d.toLocaleTimeString();
            this.canvasView = new CanvasView(this.imageURI);
            this.colorSelectorView = new ContextColorSelectorView();
        }
        render(): CaptureView {
            this.$el.append(
                this.tpl.render({
                    title: this.title
                }),
                this.canvasView.render().$el,
                this.colorSelectorView.render().$el
            );
            return this;
        }
    }
}