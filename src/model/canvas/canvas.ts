/// <reference path="../../../definitions/jquery/jquery.d.ts" />
/// <reference path="../../../definitions/chrome/chrome.d.ts" />
/// <reference path="./tools/interface.ts" />
/// <reference path="./tools/rect.ts" />

module Prisc {
    export interface ICanvasInitOption {
        tagId?: string;
        element?: HTMLCanvasElement;
    }
    export class Canvas {

        public tagId: string = 'canvas';
        // TODO: privateのほうがいいんかな
        public __canvas: HTMLCanvasElement;
        public __context: CanvasRenderingContext2D;
        private tool: Tool;
        private isFingerDown: bool = false;

        public stackedImageData: ImageData[];
        public stashedImageData: ImageData;

        constructor(options: ICanvasInitOption = {}){
            this.tagId = options.tagId || this.tagId;
            this.__canvas = options.element || <HTMLCanvasElement>document.getElementById(this.tagId);
            this.__context = this.__canvas.getContext('2d');
        }

        public static initWithImageURI(imageURI: string, canvasElement: HTMLCanvasElement = null): Canvas {

            var img = new Image();
            img.src = imageURI;

            var self = new Canvas({
                element: canvasElement
            });
            var rate = 0.9;// FIXME: とりあえずハード
            self.__canvas.width = window.innerWidth * rate;
            self.__canvas.height = window.innerHeight * rate;
            self.__context.drawImage(
                // source image
                img,
                // starting point of source
                0,0,
                // ending point of source
                img.width, img.height,
                // where to start writing
                0,0,
                // where to end writing
                self.__canvas.width, self.__canvas.height
            );

            self.startListening();

            return self;
        }

        private startListening() {
            $(this.__canvas).on('mousedown', (ev: Event) => {
                this.onFingerDown(ev);
            });
            $(this.__canvas).on('mousemove', (ev: Event) => {
                this.onFingerMove(ev)
            });
            $(this.__canvas).on('mouseup', (ev: Event) => {
                this.onFingerUp(ev);
            });
        }
        private onFingerDown(ev: Event) {
            // 作業前の状態を確保
            this.stashedImageData = this.__context.getImageData(
                0,0,this.__canvas.width, this.__canvas.height
            );
            // 作業フラグをオン
            this.isFingerDown = true;
            // 使用するツールを決定
            this.tool = this.determineTool();
            // 色などのコンテキストを決定
            this.determineColor();
            // 開始
            this.tool.onStart(ev);
        }
        private onFingerMove(ev: Event) {
            // ツール未定義なら無視
            if (! this.tool) return;
            // 作業フラグがオフなら無視
            if (! this.isFingerDown) return;

            this.tool.onMove(ev);
        }
        private onFingerUp(ev: Event) {
            this.tool.onFinish(ev);
            // 作業フラグを解放
            this.isFingerDown = false;
        }
        private determineTool(): Tool {
            // FIXME: とりあえずハード
            return new RectTool(this);
        }
        private determineColor() {
            var bp = chrome.extension.getBackgroundPage();
            this.__context.fillStyle = bp['Prisc']['drawingContext']['color']['code'];
            this.__context.strokeStyle = bp['Prisc']['drawingContext']['color']['code'];
        }
    }
}