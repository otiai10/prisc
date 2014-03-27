/// <reference path="../view.ts" />
/// <reference path="../template.ts" />
/// <reference path="./canvas-view.ts" />
/// <reference path="./context-selector/color-selector-view.ts" />
/// <reference path="./context-selector/tool-selector-view.ts" />
/// <reference path="./context-selector/font-selector-view.ts" />
/// <reference path="./context-selector/view.ts" />

module Prisc {
    export class CaptureView extends View {
        private tpl = new HBSTemplate('capture/main.hbs');
        public title: string;
        public canvasView: CanvasView;
        public toolSelectorView: ContextToolSelectorView;
        public colorSelectorView: ContextColorSelectorView;
        public fontSelectorView: ContextFontSelectorView;
        public selectorsView: ContextSelectorsView;
        constructor(public imageURI: string) {
            super();
            var d = new Date();
            this.title = d.toLocaleTimeString();
            this.canvasView = new CanvasView(this.imageURI);
            this.toolSelectorView = new ContextToolSelectorView();
            this.colorSelectorView = new ContextColorSelectorView();
            this.fontSelectorView = new ContextFontSelectorView();
            this.selectorsView = new ContextSelectorsView();
        }
        render(): CaptureView {
            this.$el.append(
                this.tpl.render({
                    title: this.title
                }),
                this.selectorsView.render().$el,
                this.canvasView.render().$el
                /*
                this.toolSelectorView.render().$el,
                this.colorSelectorView.render().$el,
                this.fontSelectorView.render().$el,
                */
            );
            return this;
        }
    }
}