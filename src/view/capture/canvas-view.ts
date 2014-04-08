/// <reference path="../view.ts" />
/// <reference path="../common/modal-contents-tweet-view.ts" />
/// <reference path="../template.ts" />
/// <reference path="../../controller/controller.ts" />
/// <reference path="../../model/canvas/canvas.ts" />
/// <reference path="../../model/config/config.ts" />
/// <reference path="../../../definitions/jquery/jquery.d.ts" />

module Prisc {
    export var KEYCODE_ENTER: number = 13;
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
                'keypress #download-file-name': 'bindDownloadShortcut',
                'click #undo': 'undo',
                'click #tweet': 'tweet'
            };
        }
        render(): CanvasView {
            var d = new Date();
            var defaultFileName = d.toLocaleString().replace(/[\/\s:]/g,'-');
            this.$el.append(
                this.tpl.render(),
                this.fileActionTpl.render({
                    defaultFileName: defaultFileName
                })
            );
            this.canvas = Canvas.initWithImageURI(
                this.imageURI,
                <HTMLCanvasElement>this.$el.find('canvas')[0]
            );
            return this;
        }
        bindDownloadShortcut(ev: JQueryEventObject) {
            if(ev.charCode == KEYCODE_ENTER || ev.keyCode == KEYCODE_ENTER) {
                this.downloadImageFile(ev);
            }
        }
        downloadImageFile(ev: Event) {
            ev.preventDefault();
            ev.stopPropagation();
            var ext = ImageFormats[Config.get('image-format')];
            var format = 'image/' + ext;
            var imageURI = this.canvas.getImageURI(format);
            var filename = $("#download-file-name").val() + "." + ext.replace('e','');
            Controller.sendMessage('DownloadImage',{
                imageURI:imageURI,
                filename:filename
            });
        }
        undo() {
            this.canvas.undo();
        }
        tweet() {
            var ext = ImageFormats[Config.get('image-format')];
            var format = 'image/' + ext;
            var imageURI = this.canvas.getImageURI(format);
            var contents = new Prisc.ModalContentsTwitterView(imageURI);
            ModalView.showWithContents(contents);
        }
    }
}