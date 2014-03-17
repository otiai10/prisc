/// <reference path="../../definitions/jquery/jquery.d.ts" />

module Util {
    export class Query {
        public search: string;
        public params: Object;
        constructor(params: Object = {}) {
            this.search = window.location.search;
            this.params = params;
        }
        toJSON(defaultValues: Object = {}): Object {
            var res: Object = defaultValues;
            var matches = this.search.match(/^\?(.+)/);
            if (matches == null) return res;
            var keyValuePairs = matches[1].split('&');
            $.map(keyValuePairs, (kv) => {
                var k_v = kv.split('=');
                if (k_v.length < 2) return;
                res[k_v[0]] = k_v[1];
            });
            return res;
        }
        toString(params: Object = null): string {
            var res: string;
            var queries = [];
            this.params = params || this.params;
            $.map(this.params, (value, key) => {
                queries.push([key,'=',value].join(''));
            });
            return '?' + queries.join('&');
        }
    }
}