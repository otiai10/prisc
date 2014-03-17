/// <reference path="../template.ts" />
/// <reference path="../../definitions/showv/showv.d.ts" />

module Prisc {
    export class PaletteView extends showv.View {
        private tpl = new HBSTemplate('asset/tpl/hoge.hbs');
        constructor(){
            super();
        }
    }
}
