/// <reference path="../controller/controller.ts" />

module Prisc {
    export class Message {
        constructor(
            public purpose: string,
            public params:  Object
        ){}
        public static factory(message: Object): Message {
            return new Message(
                message['purpose'],
                message['params']
            );
        }
    }
    export class MessageRoutes {
        public static match(purpose): Controller {
            var controllerName = 'Message' + purpose + 'Controller';
            if (! Prisc[controllerName]) controllerName = 'MessageNotFoundController';
            return new Prisc[controllerName]();
        }
    }
}