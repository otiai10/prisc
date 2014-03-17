/// <reference path="../definitions/handlebars/handlebars.d.ts" />
// TODO: あーここが問題っぽい
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
