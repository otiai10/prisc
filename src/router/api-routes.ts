/// <reference path="../../definitions/jquery/jquery.d.ts" />
/// <reference path="../controller/controller.ts" />

module Prisc {
    export class Call {
        constructor(
            public path:   string,
            public params: Object
        ){}
        public static factory(apiCall: Object): Call {
            return new Call(
                apiCall['path'],
                apiCall['params']
            );
        }
    }
    export class ApiRoutes {
        public static match(path: string): Controller {
            console.log("[004]", "in ApiRoutes.match", path);
            var name = $.map(path.split('/'), (subPath: string) => {
                return subPath.slice(0,1).toUpperCase() + subPath.slice(1);
            }).join('');
            console.log("[005]", "in ApiRoutes.match name generated", name);
            var controllerName = 'Api' + name + 'Controller';
            var originalPath = controllerName;
            console.log("[006]", "in ApiRoutes.match controllerName", controllerName);
            if (! Prisc[controllerName]) controllerName = 'MessageNotFoundController';
            console.log("[007]", "in ApiRoutes.match controllerName", controllerName, Prisc[controllerName]);
            return new Prisc[controllerName](originalPath);
        }
    }
}