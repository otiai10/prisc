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
            var name = $.map(path.split('/'), (subPath: string) => {
                return subPath.slice(0,1).toUpperCase() + subPath.slice(1);
            }).join('');
            var controllerName = 'Api' + name + 'Controller';
            var originalPath = controllerName;
            if (! Prisc[controllerName]) controllerName = 'MessageNotFoundController';
            return new Prisc[controllerName](originalPath);
        }
    }
}