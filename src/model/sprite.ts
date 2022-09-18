export interface Sprite{
    name:string;
    update():void;
    draw(canvas:HTMLCanvasElement):void;
    settableProperties:Map<string, any>;
}