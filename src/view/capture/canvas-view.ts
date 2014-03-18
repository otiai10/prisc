/// <reference path="../view.ts" />
/// <reference path="../template.ts" />
/// <reference path="../../controller/controller.ts" />
/// <reference path="../../model/canvas/canvas.ts" />

module Prisc {
    export class CanvasView extends View {
        public canvas: Canvas;
        private tpl = new HBSTemplate('capture/canvas.hbs');
        private fileActionTpl = new HBSTemplate('capture/file-action.hbs');
        constructor(private imageURI: string){
            super();
        }
        events(): Object {
            return {
                'click #download-img': 'downloadImageFile',
                'click #undo': 'undo'
            };
        }
        render(): CanvasView {
            this.$el.append(
                this.tpl.render(),
                this.fileActionTpl.render()
            );
            this.canvas = Canvas.initWithImageURI(
                this.imageURI,
                <HTMLCanvasElement>this.$el.find('canvas')[0]
            );
            return this;
        }
        downloadImageFile() {
            var imageURI = this.canvas.getImageURI();
            Controller.sendMessage('DownloadImage',{imageURI:imageURI})
        }
        undo() {
            this.canvas.undo();
        }
    }
}