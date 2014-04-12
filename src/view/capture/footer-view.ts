/// <reference path="../view.ts" />
/// <reference path="./context-selector/color-selector-view.ts" />
/// <reference path="./context-selector/font-selector-view.ts" />
/// <reference path="../template.ts" />
/// <reference path="../../model/canvas/canvas.ts" />

module Prisc {
    export class CaptureFooterView extends View {
        public canvas: Canvas;
        private colorSelectorView: ContextColorSelectorView;
        private fontSelectorView: ContextFontSelectorView;
        constructor(){
            super({
                className: 'footer boxy'
            });
            this.colorSelectorView = new ContextColorSelectorView();
            this.fontSelectorView = new ContextFontSelectorView();
        }
        render(): CaptureFooterView {
            this.$el.append(
                this.colorSelectorView.render().$el,
                this.fontSelectorView.render().$el
            );
            return this;
        }
    }
}