/// <reference path="../../../../definitions/jquery/jquery.d.ts" />
/// <reference path="./interface.ts" />
/// <reference path="../canvas.ts" />

module Prisc {
    export class DropperTool implements Tool {

        private now: ICoordinates;

        constructor(private canvas: Canvas) {}
        onStart(ev) {
            this.now = {
                x: ev.offsetX,
                y: ev.offsetY
            };
            this.getColor();
        }
        onMove(ev) {
            this.now = {
                x: ev.offsetX,
                y: ev.offsetY
            };
            this.getColor();
        }
        onFinish(ev) {
            this.now = {
                x: ev.offsetX,
                y: ev.offsetY
            };
            this.getColor();
        }
        private getColor() {
            var data = this.canvas.__context.getImageData(
                this.now.x,
                this.now.y,
                this.now.x + 1,
                this.now.y + 1
            ).data;
            var startOfUint8 = this.now.x * 4 + this.now.y * 4;
            var r = data[startOfUint8];
            var g = data[startOfUint8 + 1];
            var b = data[startOfUint8 + 2];
            var colorHexStr = "#" + r.toString(16) + g.toString(16) + b.toString(16);
            $('#color-selector').val(colorHexStr);
        }
    }
}