export interface Sprite{
    name:string; // unique identifier
    update():void;
    draw(canvas:HTMLCanvasElement):void;
    settableProperties:Array<[string, string, string]>;
    getPropertyNames():string[];
    setValue(key:string, val:string):void;
    getConvertedValue(key:string):any;
}