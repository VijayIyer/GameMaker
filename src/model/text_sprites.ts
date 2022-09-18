import { Sprite } from "./sprite";

export class TextSprite implements Sprite{
    name:string = "Text";
    settableProperties: Map<string, any> = new Map<string, any>();
    constructor(text:string = "text", x:number = 10, y:number = 10, 
    width:number = 5, font:string = "20px serif"){
        
        this.settableProperties.set("content", text);
        this.settableProperties.set("x", x);
        this.settableProperties.set("y", y);
        this.settableProperties.set("font", font);
    }
    update(): void {
        
    }
    getPropertyNames(): string[] {
        return [...this.settableProperties.keys()];
    }
    draw(canvas:HTMLCanvasElement):void{
        let ctx:CanvasRenderingContext2D =canvas.getContext("2d") as CanvasRenderingContext2D;
        ctx.font = this.settableProperties.get("font");
        ctx.fillText(this.settableProperties.get("content"),
            this.settableProperties.get("x"), 
            this.settableProperties.get("y"));
    }
}

export class ClockSprite extends TextSprite{
    name:string = "Clock";
    time:number = 0;
    update():void{

    }
    reset():void{
        
    }
    draw(canvas:HTMLCanvasElement):void{
        let ctx:CanvasRenderingContext2D =canvas.getContext("2d") as CanvasRenderingContext2D;
        ctx.font = this.settableProperties.get("font");
        ctx.fillText(this.time.toString(),
            this.settableProperties.get("x"), 
            this.settableProperties.get("y"));
    }
    
}