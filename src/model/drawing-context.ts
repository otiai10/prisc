
module Prisc {
    export class DrawingContext {
        public color: Color;
        public tool: DrawingTools;
        constructor() {
            this.color = new Color();
            this.tool = DrawingTools.RectTool;
        }
        updateColor(colorCode: string): boolean {
            // TODO: validate return false
            this.color.code = colorCode;
            return true;
        }
        updateTool(tool: DrawingTools): boolean {
            // TODO: validate return false
            this.tool = DrawingTools[DrawingTools[tool]];
            return true;
        }
    }
    export class Color {
        constructor(public code: string = '#000') {}
    }
    export enum DrawingTools {
        RectTool,
        PenTool,
        TrimTool,
        TextTool
    }
}