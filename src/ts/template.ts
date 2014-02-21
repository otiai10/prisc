/// <reference path="./prefix.ts" />
module Prisc {
    export class HBSTemplate {
        private template: HandlebarsTemplate = null;
        constructor(private name: string) {
            this.template = HBS['tpl/' + name];
        }
        render(param?: Object): string {
            return this.template(param);
        }
    }
}
