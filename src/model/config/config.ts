/// <reference path="../storage-base.ts" />

module Prisc {
    export enum ImageFormats {
        png,
        jpeg
    }
    interface IDefaultConfigs {
        'download-dir-name': string;
        'image-format': ImageFormats;
        'show-file-on-download': boolean;
        'only-capture': boolean;
    }
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
        public static set(key: string, value: any) {
            var config = Config.getAccessor().get() || Config.defaults;
            config[key] = value;
            return Config.getAccessor().set(config)[key];
        }
        public static get(key: string): any {
            var config = Config.getAccessor().get() || Config.defaults;
            return config[key] || Config.defaults[key];
        }
        private static defaults: IDefaultConfigs = {
            'download-dir-name'    : 'Prisc',
            'image-format'         : ImageFormats.png,
            'show-file-on-download': true,
            'only-capture'         : true
        };
        public static getFileName(defaultFileName: string = String(Date.now())): string {
            return [
                defaultFileName,
                ImageFormats[Config.get('image-format')].replace('e','')
            ].join('.');
        }
    }
}