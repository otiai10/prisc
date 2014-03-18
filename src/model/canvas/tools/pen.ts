/// <reference path="./interface.ts" />
/// <reference path="../canvas.ts" />

module Prisc {
    export class PenTool implements Tool{

        private former: ICoordinates;
        private latter: ICoordinates;

        constructor(private canvas: Canvas) {}
        onStart(ev) {
            this.former = {
                x: ev.offsetX,
                y: ev.offsetY
            };
            this.latter = {
                x: ev.offsetX,
                y: ev.offsetY
            };
            this.plot();
        }
        onMove(ev) {
            this.latter = {
                x: ev.offsetX,
                y: ev.offsetY
            };
            this.drawLine();
            this.former = {
                x: ev.offsetX,
                y: ev.offsetY
            };
            this.plot();
        }
        onFinish(ev) {
            this.plot();
        }
        private drawLine() {
            // formerからlatterまでの直線を引く
            this.canvas.__context.beginPath();
            this.canvas.__context.moveTo(
                this.former.x,
                this.former.y
            );
            this.canvas.__context.lineTo(
                this.latter.x,
                this.latter.y
            );
            this.canvas.__context.stroke();
        }
        private plot() {
            // 奇麗にするために円をプロットする
            this.canvas.__context.arc(
                this.latter.x, this.latter.y,
                this.canvas.__context.lineWidth / 2,
                0,// start angle
                2 * Math.PI// end angle
            );
            this.canvas.__context.fill();
        }
    }
}
