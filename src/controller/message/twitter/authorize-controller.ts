
module Prisc {
    export class MessageTwitterAuthorizeController extends Controller {
        constructor(){
            super();
        }
        execute(params: Object) {
            oauth.authorize((apiAccessToken) => {
                console.log("in background (DO NOT PUBLISH THIS) -> ", apiAccessToken);
            });
        }
    }
}