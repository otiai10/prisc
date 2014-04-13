/// <reference path="../../../../definitions/chrome/chrome.d.ts" />
/// <reference path="../../../../definitions/jquery/jquery.d.ts" />
/// <reference path="../../../controller/controller.ts" />
/// <reference path="../../../model/canvas/canvas.ts" />
/// <reference path="../../view.ts" />
/// <reference path="../../template.ts" />

module Prisc {
    export class ContextToolSelectorView extends View {
        private tpl = new HBSTemplate('capture/context-selector/tools.hbs');
        public canvas: Canvas;
        constructor() {
            super({
                className:'canvas-tools-wrapper'
            });
        }
        events(): Object {
            return {
                'change .drawing-tools': 'changeTool',
                'click #undo': 'undo'
            }
        }
        changeTool(ev: JQueryEventObject) {
            Controller.sendMessage('ChangeTool',{toolName:ev.target['value']});
        }
        undo() {
            this.canvas.undo();
        }
        render(): ContextToolSelectorView {
            this.$el.append(
                this.tpl.render()
            );
            return this;
        }
    }
}