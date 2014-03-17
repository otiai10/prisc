/// <reference path="../views/view.ts" />
/// <reference path="../controller/controller.ts" />
/// <reference path="../util/query.ts" />
/// <reference path="./routes" />

module Prisc {
    export class Router {
        public static resolve(): View {
            var query = new Util.Query();
            var params = query.toJSON();
            var controller = Routes.match(params['view']);
            return controller.execute(params);
        }
    }
}