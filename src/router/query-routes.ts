/// <reference path="../controller/controller.ts" />

module Prisc {
    export class Routes {
        public static match(key){
            var controllerName = key + 'Controller';
            var originalQuery = controllerName;
            if (! Prisc[controllerName]) controllerName = 'QueryNotFoundController';
            return new Prisc[controllerName](originalQuery);
        }
    }
}