
module Prisc {
    export class DrawingContext {
        public color: Color;
        constructor() {
            this.color = new Color();
        }
        updateColor(colorCode: string): boolean {
            this.color.code = colorCode;
            return true;
        }
    }
    export class Color {
        constructor(public code: string = '#000') {}
    }
}