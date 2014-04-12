
module Prisc {
    export class ContextSelectorsView extends View{
        public toolSelectorView: ContextToolSelectorView;
        constructor(){
            super({
                className: 'boxy',
                tagName: 'div'
            });
            this.toolSelectorView = new ContextToolSelectorView();
        }
        render(): ContextSelectorsView {
            this.$el.append(
                this.toolSelectorView.render().$el
            );
            return this;
        }
    }
}