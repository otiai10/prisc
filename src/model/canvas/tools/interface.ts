
module Prisc {
    export interface ICoordinates {
        x: number;
        y: number;
    }
    export interface Tool {
        onStart(ev: Event): void;
        onMove(ev: Event): void;
        onFinish(ev: Event): void;
    }
}