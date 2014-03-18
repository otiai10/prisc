/// <reference path="../../../../definitions/chrome/chrome.d.ts" />
/// <reference path="../../../../definitions/jquery/jquery.d.ts" />
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
        changeColor() {
            // うーん、ここにわたってこないんだっけ
            var val = $('#color-selector').val();
            var message = {
                purpose: 'ChangeColor',
                params: {colorCode: val}
            };
            chrome.runtime.sendMessage(message,(response) => {
                console.log('response???', response);
            });
        }
        render(): ContextColorSelectorView {
            this.$el.append(
                this.tpl.render()
            );
            return this;
        }
    }
}