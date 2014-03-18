/// <reference path="./interface.ts" />
/// <reference path="../canvas.ts" />

module Prisc {
    export class TextTool implements Tool {

        constructor(private canvas: Canvas) {}
        onStart(ev){
            this.draw(ev);
        }
        onMove(ev){
            this.rollback();
            this.draw(ev);
        }
        onFinish(ev){
            this.rollback();
            this.draw(ev);
        }
        private draw(ev) {
            this.canvas.__context.fillText(
                this.canvas.fontValue,
                ev.offsetX,
                ev.offsetY
            );
        }
        private rollback() {
            this.canvas.__context.putImageData(
                this.canvas.stashedImageData,0,0
            );
        }
    }
}