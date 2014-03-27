
module Prisc {
    export class ContextSelectorsView extends View{
        private colorTpl = new HBSTemplate('capture/context-selector/color.hbs');
        private fontTpl = new HBSTemplate('capture/context-selector/font.hbs');
        private toolsTpl = new HBSTemplate('capture/context-selector/tools.hbs');
        constructor(){
            super({
                className: 'boxy'
            });
        }
        events(): Object {
            return {
                'change .drawing-tools': 'changeTool',
                'change #color-selector': 'changeColor',
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
        changeColor(ev: JQueryEventObject) {
            Controller.sendMessage('ChangeColor',{colorCode:ev.target['value']});
        }
        changeTool(ev: JQueryEventObject) {
            Controller.sendMessage('ChangeTool',{toolName:ev.target['value']});
         }
        render(): ContextSelectorsView {
            this.$el.append(
                this.colorTpl.render(),
                this.fontTpl.render(),
                this.toolsTpl.render()
            );
            return this;
        }
    }
}