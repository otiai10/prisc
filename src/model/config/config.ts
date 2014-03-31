/// <reference path="../storage-base.ts" />

module Prisc {
    class ConfigAccessor extends StorageBase {
        constructor() {
            super("config");
        }
    }
    export class Config {
        private static accessor: ConfigAccessor = null;
        constructor() {}
        private static getAccessor(): ConfigAccessor {
            if (Config.accessor == null) Config.accessor = new ConfigAccessor();
            return Config.accessor;
        }
        private static defaults = {
            'download-dir-name': 'prisc'
        }
        public static set(key: string, value: any) {
            var config = Config.getAccessor().get();
            if (config == null) config = Config.defaults;
            config[key] = value;
            return Config.getAccessor().set(config)[key];
        }
        public static get(key: string): any {
            var config = Config.getAccessor().get();
            if (config == null) config = Config.defaults;
            return (typeof config[key] == 'undefined') ? Config.defaults[key] : config[key];
        }
    }
}