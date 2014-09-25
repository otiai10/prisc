/// <reference path="../../../definitions/jquery/jquery.d.ts" />
/// <reference path="../../../definitions/chrome/chrome.d.ts" />
/// <reference path="./tools/interface.ts" />
/// <reference path="./tools/rect.ts" />
/// <reference path="../drawing-context.ts" />

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

        public stackedImageData: ImageData[] = [];
        public stashedImageData: ImageData;
        public fontValue: string;

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

            // {{{ Canvasの大きさを決める
            // 比率は保持する
            var imageAspectRate = img.height / img.width;
            if (window.innerWidth < img.width) {
                // 画像のほうが大きければ、最終結果はwindow基準で決める
                self.__canvas.width = window.innerWidth - 200;
            } else if (img.width < window.innerWidth - 120) {
                // window幅より余裕をもって小さいのであればそのままの大きさ
                self.__canvas.width = img.width;
            } else {
                var rate = 0.9;// FIXME: とりあえずハード
                // 微妙な大きさなので、imgを0.9倍する
                self.__canvas.width = img.width * 0.9;
            }
            // }}}

            self.__canvas.height = self.__canvas.width * imageAspectRate;
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
            this.pushStack();
            // 作業フラグをオン
            this.isFingerDown = true;
            // 使用するツールを決定
            this.tool = this.determineTool();
            // 色などのコンテキストを決定
            this.determineColor();
            this.determineLineWidth();
            this.determineFont();
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
            var dc = chrome.extension.getBackgroundPage()['Prisc']['drawingContext'];
            var toolName = dc.tool;
            // TODO: validation
            return new Prisc[toolName](this);
        }
        private determineColor() {
            var dc = chrome.extension.getBackgroundPage()['Prisc']['drawingContext'];
            this.__context.fillStyle = dc.color.code;
            this.__context.strokeStyle = dc.color.code;
        }
        private determineLineWidth() {
            // FIXME: とりあえずハード
            this.__context.lineWidth = 10;
        }
        private determineFont() {
            var dc = chrome.extension.getBackgroundPage()['Prisc']['drawingContext'];
            var fontSize = String(dc.font.size);
            var fontFamily = dc.font.family;
            this.__context.font = fontSize + ' ' +  fontFamily;
            this.fontValue = dc.font.value;
        }
        getImageURI(format: string = 'png') {
            var type = 'image/' + format;
            return this.__canvas.toDataURL(type);
        }
        pushStack() {
            // このときの状態を「一つの作業が終了した状態」として保存
            this.stackedImageData.push(
                this.__context.getImageData(
                    0,0,this.__canvas.width,this.__canvas.height
                )
            );
        }
        undo() {
            var imageData = this.stackedImageData.pop();
            if (! imageData) return;
            this.__context.putImageData(imageData,0,0);
        }
    }
}
