/// <reference path="../view.ts" />
/// <reference path="../template.ts" />

/// <reference path="../../model/canvas/canvas.ts" />

module Prisc {
    export class CanvasView extends View {
        public canvas: Canvas;
        private tpl = new HBSTemplate('capture/canvas.hbs');
        constructor(private imageURI: string){
            super();
        }
        render(): CanvasView {
            this.$el.append(
                this.tpl.render()
            );
            this.canvas = Canvas.initWithImageURI(
                this.imageURI,
                <HTMLCanvasElement>this.$el.find('canvas')[0]
            );
            return this;
        }
    }
}