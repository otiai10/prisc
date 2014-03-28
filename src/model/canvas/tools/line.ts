/// <reference path="./interface.ts" />
/// <reference path="../canvas.ts" />

module Prisc {
    export class LineTool implements Tool {

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
            this.canvas.__context.beginPath();
            this.canvas.__context.moveTo(this.start.x, this.start.y)
            this.canvas.__context.lineTo(this.end.x, this.end.y)
            this.canvas.__context.stroke()
        }
    }
}