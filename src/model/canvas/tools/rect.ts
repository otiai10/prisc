/// <reference path="./interface.ts" />
/// <reference path="../canvas.ts" />

module Prisc {
    export class RectTool implements Tool {

        private start: ICoordinates;
        private end: ICoordinates;

        constructor(private canvas: Canvas) {}
        onStart(ev) {
            this.start = {
                x: ev.offsetX,
                y: ev.offsetY
            };
        }
        onMove(ev) {
            this.rollback();
            this.end = {
                x: ev.offsetX,
                y: ev.offsetY
            };
            this.draw();
        }
        onFinish(ev) {
            this.end = {
                x: ev.offsetX,
                y: ev.offsetY
            };
            this.draw();

        }
        private rollback() {
            this.canvas.__context.putImageData(
                this.canvas.stashedImageData,0,0
            );
        }
        private draw() {
            this.canvas.__context.fillRect(
                this.start.x,
                this.start.y,
                this.end.x - this.start.x,
                this.end.y - this.start.y
            );
        }
    }
}