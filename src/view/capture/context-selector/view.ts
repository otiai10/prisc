
module Prisc {
    export class ContextSelectorsView extends View{
        public toolSelectorView: ContextToolSelectorView;
        public colorSelectorView: ContextColorSelectorView;
        public fontSelectorView: ContextFontSelectorView;
        constructor(){
            super({
                className: 'boxy',
                tagName: 'div'
            });
            this.toolSelectorView = new ContextToolSelectorView();
            this.colorSelectorView = new ContextColorSelectorView();
            this.fontSelectorView = new Prisc.ContextFontSelectorView();
        }
        render(): ContextSelectorsView {
            this.$el.append(
                this.toolSelectorView.render().$el,
                this.colorSelectorView.render().$el,
                this.fontSelectorView.render().$el
            );
            return this;
        }
    }
}