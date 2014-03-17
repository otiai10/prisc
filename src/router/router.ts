/// <reference path="../views/view.ts" />
/// <reference path="../controller/controller.ts" />
/// <reference path="./routes" />

module Prisc {
    export class Router {
        public static resolve(): View {
            var view = 'Capture';
            var controller = Routes.match(view);
            return controller.execute();
        }
    }
}