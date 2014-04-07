/// <reference path="../../../definitions/chrome/chrome.d.ts" />
/// <reference path="../view.ts" />
/// <reference path="../template.ts" />

module Prisc {
    export class ModalContentsTwitterView extends View {
        public image: HTMLImageElement;
        private tpl = new HBSTemplate('common/modal-contents-twitter.hbs');
        constructor(imageURI: string) {
            super({
                className: 'modal-contents modal-contents-twitter'
            });
            this.image = new Image();
            this.image.src = imageURI;
        }
        render(): ModalContentsTwitterView {
            this.$el.append(
                // this.image
                this.tpl.render()
            );
            return this;
        }
    }
}