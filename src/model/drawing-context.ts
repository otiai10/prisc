
module Prisc {
    export class DrawingContext {
        public color: Color;
        public font: Font;
        public tool: DrawingTools;
        constructor() {
            this.color = new Color();
            this.font = new Font();
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
        updateFontValue(fontValue: string): boolean {
            this.font.value = fontValue;
            return true;
        }
        updateFontSize(fontSize: string): boolean {
            // TODO: validate return false
            this.font.size = fontSize;
            return true;
        }
        updateFontFamily(fontFamily: string): boolean {
            // TODO: validate return false
            this.font.family = fontFamily;
            return true;
        }
    }
    export class Color {
        constructor(public code: string = '#000000') {}
    }
    export class Font {
        constructor(
            public value: string = '',
            public size: string = '4em',
            public family: string = 'Helvetica'
        ) {}
    }
    export enum DrawingTools {
        RectTool,
        PenTool,
        TrimTool,
        TextTool,
        LineTool,
        DropperTool
    }
}