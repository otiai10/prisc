/// <reference path="../../../../definitions/chrome/chrome.d.ts" />
/// <reference path="../../../../definitions/jquery/jquery.d.ts" />
/// <reference path="../../../controller/controller.ts" />
/// <reference path="../../view.ts" />
/// <reference path="../../template.ts" />

module Prisc {
    export class ContextFontSelectorView extends View {
        private tpl = new HBSTemplate('capture/context-selector/font.hbs')
        constructor() {
            super();
        }
        events(): Object {
            return {
                'keyup #text-font-value':'changeFontValue',
                'change #text-font-size':'changeFontSize',
                'change #text-font-family':'changeFontFamily'
            }
        }
        changeFontValue() {
            // うーん、ここにわたってこないんだっけ
            var val = $('#text-font-value').val();
            Controller.sendMessage('ChangeFontValue', {fontValue: val});
        }
        changeFontSize() {
            // うーん
            var val = $('#text-font-size').val();
            Controller.sendMessage('ChangeFontSize', {fontSize: val});
        }
        changeFontFamily() {
            // うーん
            var val = $('#text-font-family').val();
            Controller.sendMessage('ChangeFontFamily', {fontFamily: val});
        }
        render(): ContextFontSelectorView {
            this.$el.append(
                this.tpl.render()
            );
            return this;
        }
    }
}