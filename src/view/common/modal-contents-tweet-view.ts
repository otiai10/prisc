/// <reference path="../../../definitions/chrome/chrome.d.ts" />
/// <reference path="../../../definitions/jquery/jquery.d.ts" />
/// <reference path="../../service/twitter.ts" />
/// <reference path="../view.ts" />
/// <reference path="../template.ts" />

module Prisc {
    export class ModalContentsTwitterView extends View {
        private tpl = new HBSTemplate('common/modal-contents-twitter.hbs');
        private tweetedPermalinkTpl = new HBSTemplate('common/tweeted-permalink.hbs');
        private embedImageView: EmbedImageView;
        private status: string = '';
        private $counter: JQuery;
        constructor(public imageURI: string) {
            super({
                className: 'modal-contents modal-contents-twitter'
            });
            this.embedImageView = new EmbedImageView(imageURI);
        }
        render(): ModalContentsTwitterView {
            this.$el.append(
                this.tpl.render()
            );
            this.$el.find('#tweet-image-container').append(
                this.embedImageView.render().$el
            );
            this.$counter = this.$el.find('#tweet-text-counter');
            return this;
        }
        events(): Object {
            return {
                'click #js-tweet-btn': 'tweet',
                'keyup #js-tweet-box': 'count'
            };
        }
        tweet(ev: JQueryEventObject) {
            if (! this.validate()) return;
            ev.stopPropagation();
            ev.preventDefault();
            $(ev.currentTarget).replaceWith($('<div class="ajax-loader"></div>'));
            var type_uri = this.imageURI.replace('data:','').split('base64,');
            this.status = $('#js-tweet-box').text();

            var twitterService = new ServiceTwitter();
            var p: JQueryPromise<Object> = twitterService.tweetWithImageURI(
                type_uri[1],
                type_uri[0],
                this.status
            );
            p.done((res: Object) => {
                this.onSuccess(res);
            });
            p.fail((errors: Object) => {
                this.onFailure(errors);
            });
        }
        onSuccess(res: Object) {
            var url = ServiceTwitter.getPermalinkFromSuccessResponse(res);
            $('#main').append(
                this.tweetedPermalinkTpl.render({url:url})
            );
            ModalView.cancel();
        }
        onFailure(errors: Object) {
            var message = "Twitter Error\n\n";
            $.map(errors['errors'], (err: any, key: string) => {
                message += "[" + key + "]\n";
                message += "code:\t" + err.code + "\n";
                message += "message:\t" + err.message + "\n\n";
            });
            message += "Please report to the developer.\nhttps://twitter.com/otiai10";
            window.alert(message);
            ModalView.cancel();
        }
        count() {
            this.status = $('#js-tweet-box').text();
            var lengthLeft = ServiceTwitter.STATUS_MAX_LENGTH - this.status.length;
            this.$counter.text(String(lengthLeft));
            if (lengthLeft < 0) {
                this.$counter.addClass('count-over');
            } else {
                this.$counter.removeClass('count-over');
            }
        }
        validate(): boolean {
            if (this.status.length > ServiceTwitter.STATUS_MAX_LENGTH) return false;
            return true;
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