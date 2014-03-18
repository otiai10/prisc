/// <reference path="../controller/controller.ts" />

module Prisc {
    export class Routes {
        public static match(key){
            var controllerName = key + 'Controller';
            if (! Prisc[controllerName]) controllerName = 'QueryNotFoundController';
            return new Prisc[controllerName]();
        }
    }
}