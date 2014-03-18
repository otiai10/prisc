/// <reference path="../../../../definitions/chrome/chrome.d.ts" />
/// <reference path="../../../../definitions/jquery/jquery.d.ts" />
/// <reference path="../../view.ts" />
/// <reference path="../../template.ts" />

module Prisc {
    export class ContextToolSelectorView extends View {
        private tpl = new HBSTemplate('capture/context-selector/tools.hbs')
        constructor() {
            super();
        }
        events(): Object {
            return {
                'change .drawing-tools': 'changeColor'
            }
        }
        changeColor() {
            // うーん、ここにevとかわたってこないんだっけ
            // 渡すだけじゃね？
            var val = $('input[name="drawing-tool"]').filter(':checked').val();
            var message = {
                purpose: 'ChangeTool',
                params: {toolName: val}
            };
            chrome.runtime.sendMessage(message,(response) => {
                console.log('response???', response);
            });
        }
        render(): ContextToolSelectorView {
            this.$el.append(
                this.tpl.render()
            );
            return this;
        }
    }
}