/// <reference path="../../../definitions/chrome/chrome.d.ts" />
/// <reference path="../../model/config/config.ts" />
/// <reference path="../controller.ts" />

module Prisc {
    export interface IDownloadParams {
        filename: string;
        imageURI: string;
    }
    export class MessageDownloadImageController extends Controller {
        constructor() {
            super();
        }
        execute(params: IDownloadParams) {
            var dirName = Config.get('download-dir-name'),
               filename = params.filename;
            chrome.downloads.download({
                url: params.imageURI,
                filename: [dirName, filename].join('/')
            },(downloadId: number) => {
                if (! Config.get('show-file-on-download')) return;
                // FIXME: なんやこれ。なんでコールバックなのに待たなあかんねん　
                // FIXME: なんのためのコールバックですかwww
                // FIXME: 125 < limitTime < 250 or depending on file size??
                var delay = 250;
                setTimeout(() => {
                    chrome.downloads.show(downloadId);
                }, delay);
            });
        }
    }
}
