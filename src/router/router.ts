/// <reference path="../view/view.ts" />
/// <reference path="../controller/controller.ts" />
/// <reference path="../util/query.ts" />
/// <reference path="./query-routes" />
/// <reference path="./message-routes.ts" />
/// <reference path="./api-routes.ts" />

module Prisc {
    export class Router {
        public static resolve(): View {
            var query = new Util.Query();
            var params = query.toJSON();
            var controller = Routes.match(params['view']);
            return controller.execute(params);
        }
        public static message(message: Message): any/* View? */{
            var controller = MessageRoutes.match(message.purpose);
            return controller.execute(message.params);
        }
        public static callAPI(called: Call): any {
            console.log("[003]", "in Router.callAPI", called);
            var controller = ApiRoutes.match(called.path);
            console.log("[008]", "in Router.callAPI controller constructed", controller);
            return controller.execute(called.params);
        }
    }
}