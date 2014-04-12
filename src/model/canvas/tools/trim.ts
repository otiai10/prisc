/// <reference path="./interface.ts" />
/// <reference path="../canvas.ts" />
/// <reference path="../../../controller/controller.ts" />

module Prisc {
    export class TrimTool implements Tool {

        private start: ICoordinates;
        private end: ICoordinates;

        private lineWidth: number = 0.5;
        private strokeStyle: string = '#AAA';

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
            this.rollback();

            var imageURI = this.getTrimmedImageURI();
            Controller.openCaptureViewByMessagingUrl(imageURI);
        }
        private rollback() {
            this.canvas.__context.putImageData(
                this.canvas.stashedImageData,0,0
            );
        }
        private draw() {
            // 切り取り描画のときだけ
            this.canvas.__context.lineWidth = this.lineWidth;
            this.canvas.__context.strokeStyle = this.strokeStyle;
            this.canvas.__context.strokeRect(
                this.start.x,
                this.start.y,
                this.end.x - this.start.x,
                this.end.y - this.start.y
            );
        }
        private getTrimmedImageURI(): string {
            var partialData = this.canvas.__context.getImageData(
                this.start.x,
                this.start.y,
                this.end.x - this.start.x,
                this.end.y - this.start.y
            );
            // 一時的にキャンバスを作る
            var _tmpCanvas = document.createElement('canvas');
            _tmpCanvas.width = partialData.width;
            _tmpCanvas.height = partialData.height;
            var _tmpContext = _tmpCanvas.getContext('2d');
            _tmpContext.putImageData(partialData, 0, 0);
            // FIXME: とりあえずハード
            var format = 'image/png';
            var imageURI = _tmpCanvas.toDataURL(format);
            return imageURI;
        }
    }
}