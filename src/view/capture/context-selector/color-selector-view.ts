/// <reference path="../../../../definitions/chrome/chrome.d.ts" />
/// <reference path="../../../../definitions/jquery/jquery.d.ts" />
/// <reference path="../../../controller/controller.ts" />
/// <reference path="../../view.ts" />
/// <reference path="../../template.ts" />

module Prisc {
    export class ContextColorSelectorView extends View {
        private tpl = new HBSTemplate('capture/context-selector/color.hbs')
        constructor() {
            super();
        }
        events(): Object {
            return {
                'change #color-selector': 'changeColor'
            }
        }
        changeColor(ev: JQueryEventObject) {
            Controller.sendMessage('ChangeColor',{colorCode:ev.target['value']});
        }
        render(): ContextColorSelectorView {
            this.$el.append(
                this.tpl.render()
            );
            return this;
        }
    }
}