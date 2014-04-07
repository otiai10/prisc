/// <reference path="../../../../definitions/chrome/chrome.d.ts" />
/// <reference path="../../view.ts" />
/// <reference path="../../template.ts" />

/// <reference path="./download-dir-name-view.ts" />
/// <reference path="./auth-twitter.ts" />

module Prisc {
    export class OptionContentsView extends View {
        constructor() {
            super({
                className: 'options-contents'
            });
        }
        render(): OptionContentsView {
            var downloadDirNameView = new DownloadDirNameView();
            var imageFormatView = new ImageFormatView();
            var showOnDownloadView = new ShowFileOnDownloadView();
            var onlyCaptureView = new OnlyCaptureView();
            var authTwitterView = new AuthTwitterView();
            this.$el.append(
                downloadDirNameView.render().$el,
                showOnDownloadView.render().$el,
                imageFormatView.render().$el,
                onlyCaptureView.render().$el,
                authTwitterView.render().$el
            );
            return this;
        }
    }
}