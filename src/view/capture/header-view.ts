/// <reference path="../view.ts" />
/// <reference path="../template.ts" />
/// <reference path="../../model/canvas/canvas.ts" />

module Prisc {
    export class CaptureHeaderView extends View {
        public canvas: Canvas;
        private tpl = new HBSTemplate('capture/header.hbs');
        constructor(){
            super({
                className: 'header'
            });
        }
        render(): CaptureHeaderView {
            var d = new Date();
            var title = d.toLocaleTimeString();
            this.$el.append(
                this.tpl.render({title: title})
            );
            return this;
        }
    }
}