
module Prisc {
    export class StorageBase {
        constructor(private storageName: string) {}
        set(value: Object) {
            localStorage.setItem(this.storageName, JSON.stringify(value));
            return value;
        }
        get(): Object {
            return JSON.parse(localStorage.getItem(this.storageName));
        }
    }
}