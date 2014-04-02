/// <reference path="../view.ts" />
/// <reference path="../template.ts" />
/// <reference path="../../controller/controller.ts" />
/// <reference path="../../model/canvas/canvas.ts" />
/// <reference path="../../model/config/config.ts" />

module Prisc {
    export class CanvasView extends View {
        public canvas: Canvas;
        private tpl = new HBSTemplate('capture/canvas.hbs');
        private fileActionTpl = new HBSTemplate('capture/file-action.hbs');
        constructor(private imageURI: string){
            super({
                tagName: 'div',
                className: 'boxy'
            });
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
        downloadImageFile(ev: Event) {
            ev.preventDefault();
            ev.stopPropagation();
            var ext = ImageFormats[Config.get('image-format')];
            var format = 'image/' + ext;
            var imageURI = this.canvas.getImageURI(format);
            var filename = "jQueryを使って取得するなり." + Date.now() + "." + ext.replace('e','');
            Controller.sendMessage('DownloadImage',{
                imageURI:imageURI,
                filename:filename
            });
        }
        undo() {
            this.canvas.undo();
        }
    }
}