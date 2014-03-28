/// <reference path="../../../definitions/chrome/chrome.d.ts" />
/// <reference path="../view.ts" />
/// <reference path="../template.ts" />
/// <reference path="./canvas-view.ts" />
/// <reference path="../../model/drawing-context.ts" />
/// <reference path="./context-selector/color-selector-view.ts" />
/// <reference path="./context-selector/tool-selector-view.ts" />
/// <reference path="./context-selector/font-selector-view.ts" />
/// <reference path="./context-selector/view.ts" />

module Prisc {
    export class CaptureView extends View {
        private tpl = new HBSTemplate('capture/main.hbs');
        public title: string;
        public canvasView: CanvasView;
        public selectorsView: ContextSelectorsView;
        constructor(public imageURI: string) {
            super();
            var d = new Date();
            this.title = d.toLocaleTimeString();
            this.canvasView = new CanvasView(this.imageURI);
            this.selectorsView = new ContextSelectorsView();
        }
        render(): CaptureView {
            this.$el.append(
                this.tpl.render({
                    title: this.title
                }),
                this.selectorsView.render().$el,
                this.canvasView.render().$el
            );
            this.affectExistingContext();
            return this;
        }
        affectExistingContext() {
            var dc = chrome.extension.getBackgroundPage()['Prisc']['drawingContext'];
            this.$el.find('#color-selector').val(dc.color.code);
            this.$el.find('input[name="drawing-tool"]').val([dc.tool]);
            this.$el.find('#text-font-value').val(dc.font.value);
            this.$el.find('#text-font-size').val(dc.font.size);
            this.$el.find('#text-font-family').val(dc.font.family);
        }
    }
}