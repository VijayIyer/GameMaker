export interface Sprite{
    name:string; // unique identifier
    update():void;
    draw(canvas:HTMLCanvasElement):void;
    settableProperties:Map<string, any>;
    getPropertyNames():string[];
}