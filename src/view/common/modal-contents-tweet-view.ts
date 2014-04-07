/// <reference path="../../../definitions/chrome/chrome.d.ts" />
/// <reference path="../view.ts" />
/// <reference path="../template.ts" />

module Prisc {
    export class ModalContentsTwitterView extends View {
        private tpl = new HBSTemplate('common/modal-contents-twitter.hbs');
        private embedImageView: EmbedImageView;
        constructor(imageURI: string) {
            super({
                className: 'modal-contents modal-contents-twitter'
            });
            this.embedImageView = new EmbedImageView(imageURI);
        }
        render(): ModalContentsTwitterView {
            this.$el.append(
                // this.image
                this.tpl.render()
            );
            this.$el.find('#tweet-image-container').append(
                this.embedImageView.render().$el
            );
            return this;
        }
    }
    class EmbedImageView extends View {
        public image: HTMLImageElement;
        constructor(imageURI: string) {
            super({
                tagName: 'a',
                className:'twitter-embed-image clickable'
            });
            this.image = new Image();
            this.image.src = imageURI;
            this.image.className = 'clickable';
            this.$el.attr({
                'href':imageURI,
                'target':'_blank'
            });
        }
        render(): EmbedImageView {
            this.$el.append(
                this.image
            );
            return this;
        }
    }
}