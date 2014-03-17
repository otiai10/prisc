/// <reference path="../template.ts" />
/// <reference path="./view.ts" />

module Prisc {
    export class SampleView extends View {
        private tpl = new HBSTemplate('sample.hbs');
        constructor(){
            super();
        }
        render(): SampleView {
            this.$el.append(
                this.tpl.render()
            );
            return this;
        }
    }
}
