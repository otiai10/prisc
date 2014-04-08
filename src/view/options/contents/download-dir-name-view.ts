/// <reference path="../../../../definitions/jquery/jquery.d.ts" />
/// <reference path="../../../model/config/config.ts" />
/// <reference path="../../view.ts" />
/// <reference path="../../template.ts" />

// TODO: ファイル分けろwww
module Prisc {
    export interface IConfigViewParams {
        title: string;
        description: string;
        name: string;
        value?: any;
    }
    export class ConfigInputView extends View {
        public tpl: HBSTemplate;
        public title: string;
        public description: string;
        public name: string;
        public value: any;
        constructor(params: IConfigViewParams){
            super({
                className: "boxy"
            });
            this.name = params.name;
            this.title = params.title;
            this.description = params.description;
            this.value = Config.get(this.name)
            this.tpl = new HBSTemplate("options/contents/common.hbs");
        }
        render(): ConfigInputView {
            this.$el.append(
                this.tpl.render({
                    title: this.title,
                    description: this.description,
                    name: this.name
                })
            );
            this.$el.find('.config-input').html(
                this.renderInputArea()
            );
            return this;
        }
        renderInputArea(): string {
            // interface
            return '';
        }
    }
    export class ConfigTextInputView extends ConfigInputView {
        constructor(params: IConfigViewParams){
            super(params);
        }
        events(): Object {
            return {
                'keyup input': 'saveText'
            };
        }
        renderInputArea(): string {
            var tpl = new HBSTemplate("options/contents/text-input.hbs");
            return tpl.render({
                name: this.name,
                value: Config.get(this.name)
            });
        }
        saveText(ev: JQueryEventObject) {
            var inputValue = ev.currentTarget['value'];
            Config.set(this.name, inputValue);
        }
    }
    export class ConfigRadioInputView extends ConfigInputView {
        public list: any[];
        constructor(params: IConfigViewParams){
            super(params);
        }
        events(): Object {
            return {
                'change input': 'saveRadio'
            };
        }
        renderInputArea(): string {
            var tpl = new HBSTemplate("options/contents/radio-input.hbs");
            return $.map(this.list, (radio: any) => {
                var checked = (Config.get(this.name) == radio.value) ? 'checked' : '';
                return tpl.render({
                    name: this.name,
                    value: radio.value,
                    label: radio.label,
                    checked: checked
                });
            }).join('');
        }
        saveRadio(ev: JQueryEventObject) {
            var inputValue = ev.currentTarget['value'];
            Config.set(this.name, inputValue);
        }
    }
    export class ConfigCheckboxInputView extends ConfigInputView {
        constructor(params: IConfigViewParams){
            super(params);
        }
        events(): Object {
            return {
                'change input': 'saveCheckbox'
            };
        }
        renderInputArea(): string {
            var tpl = new HBSTemplate("options/contents/checkbox-input.hbs");
            var checked = (Config.get(this.name)) ? 'checked' : '';
            return tpl.render({
                checked: checked
            });
        }
        saveCheckbox(ev: JQueryEventObject) {
            var inputValue = ev.currentTarget['checked'];
            Config.set(this.name, inputValue);
        }
    }
    export class DownloadDirNameView extends ConfigTextInputView {
        constructor(){
            super({
                title: "ダウンロードフォルダ",
                description: "~/Downloads/{ここで設定したフォルダ名}になります",
                name: "download-dir-name"
            });
        }
    }
    export class ImageFormatView extends ConfigRadioInputView {
        constructor(){
            super({
                title: "画像形式",
                description: "スクリーンショットの画像形式です",
                name: "image-format"
            });
            this.list = [
                {value:ImageFormats.jpeg,label:ImageFormats[ImageFormats.jpeg].replace('e','')},
                {value:ImageFormats.png,label:ImageFormats[ImageFormats.png]}
            ];
        }
    }
    export class ShowFileOnDownloadView extends ConfigCheckboxInputView {
        constructor(){
            super({
                title:"ダウンロード時に保存場所を表示",
                description:"ダウンロードフォルダで指定した場所に保存された結果を表示します",
                name: "show-file-on-download"
            });
        }
    }
    export class OnlyCaptureView extends ConfigCheckboxInputView {
        constructor(){
            super({
                title:"編集せずキャプチャをダウンロード",
                description:"編集画面を経由によって画質の劣化があり得ます。これを防ぐためにそのままダウンロードします",
                name: "only-capture"
            });
        }
    }
}