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
        changeFontValue(ev: JQueryEventObject) {
            Controller.sendMessage('ChangeFontValue', {fontValue: ev.target['value']});
        }
        changeFontSize(ev: JQueryEventObject) {
            Controller.sendMessage('ChangeFontSize', {fontSize: ev.target['value']});
        }
        changeFontFamily(ev: JQueryEventObject) {
            Controller.sendMessage('ChangeFontFamily', {fontFamily: ev.target['value']});
        }
        render(): ContextFontSelectorView {
            this.$el.append(
                this.tpl.render()
            );
            return this;
        }
    }
}