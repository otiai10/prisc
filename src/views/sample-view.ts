/// <reference path="../template.ts" />
/// <reference path="../../definitions/showv/showv.d.ts" />

module Prisc {
    export class SampleView extends showv.View {
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
