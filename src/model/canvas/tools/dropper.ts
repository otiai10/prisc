/// <reference path="../../../../definitions/jquery/jquery.d.ts" />
/// <reference path="../../../controller/controller.ts" />
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
                this.now.x,// 取るイメージのスタート座標x
                this.now.y,// 取るイメージのスタート座標y
                1,// 取るイメージのwidth
                1// 取るイメージのheight
            ).data;
            var r = data[0],
                g = data[1],
                b = data[2];
            var colorHexStr = "#" + r.toString(16) + g.toString(16) + b.toString(16);
            // モデルがビューを変えるんですか？
            $('#color-selector').val(colorHexStr);
            // drawingContextに反映
            Controller.sendMessage('ChangeColor',{colorCode: colorHexStr});
        }
    }
}