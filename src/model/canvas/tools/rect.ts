/// <reference path="./interface.ts" />
/// <reference path="../canvas.ts" />

module Prisc {
    export class RectTool implements Tool{

        private start: ICoordinates;
        private end: ICoordinates;

        constructor(private canvas: Canvas) {}
        onStart(ev) {
            // 始点座標の記憶
            this.start = {
                x: ev.offsetX,
                y: ev.offsetY
            };
        }
        onMove(ev) {
            // 初期状態に復帰
            this.rollback();
            // 終点座標の更新
            this.end = {
                x: ev.offsetX,
                y: ev.offsetY
            };
            this.draw();
        }
        onFinish(ev) {
            // 終点座標の確定
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