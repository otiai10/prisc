
module Prisc {
    export class Routes {
        public static match(key){
            var controllerName = key + 'Controller';
            if (Prisc[controllerName]) return new Prisc[controllerName]();
            return new Prisc['NotFoundController']();
        }
    }
}