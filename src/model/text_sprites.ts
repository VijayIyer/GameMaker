import { Sprite } from "./sprite";

export class TextSprite implements Sprite{
    content:string = "";
    x:number;
    y:number
    font:string = "20px serif";
    constructor(text:string, x:number = 60, y:number = 60, width:number = 5){
        this.content = text;
        this.x = x;
        this.y = y;
    }
    update(): void {
        
    }
    draw(canvas:HTMLCanvasElement):void{
        let ctx:CanvasRenderingContext2D =canvas.getContext("2d") as CanvasRenderingContext2D;
        ctx.font = this.font;
        ctx.fillText(this.content, this.x, this.y);
    }
}

export class ClockSprite extends TextSprite{
    time:number = 0;
    update():void{
        this.time+=1;
    }
    reset():void{
        this.time = 0;
    }
    
}