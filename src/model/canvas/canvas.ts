
module Prisc {
    export interface ICanvasInitOption {
        tagId?: string;
        element?: HTMLCanvasElement;
    }
    export class Canvas {

        public tagId: string = 'canvas';
        private __canvas: HTMLCanvasElement;
        private __context: CanvasRenderingContext2D;

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
            return self;
        }
    }
}