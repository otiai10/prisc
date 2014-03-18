
module Prisc {
    export class Message {
        public purpose: string;
        public params:  Object;
        constructor(message: Object) {
            this.purpose = message['purpose'];
            this.params = message['params'];
        }
    }
    export class MessageRoutes {
        public static match(purpose){
            var controllerName = 'Message' + purpose + 'Controller';
            if (Prisc[controllerName]) return new Prisc[controllerName]();
            return new Prisc['MessageNotFoundController']();
        }
    }
}