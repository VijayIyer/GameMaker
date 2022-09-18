import { Sprite } from "./sprite";

export class Circle implements Sprite{
    readonly name:string ="Circle";
    
    settableProperties: Map<string, any> = new Map<string, any>();
    constructor(x:number = 10, y:number = 20, color:string = "red", 
        radius:number = 20, width:number = 20, height:number = 30){
        this.settableProperties.set("x", x);
        this.settableProperties.set("y", y);
        this.settableProperties.set("color", color);
        this.settableProperties.set("radius", radius);
        this.settableProperties.set("width", width);
        this.settableProperties.set("height", height);
    }
    getPropertyNames():Array<string>{
        return [...this.settableProperties.keys()];
    }
    update(): void {
        
    }
    draw(canvas: HTMLCanvasElement): void {
        let ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
        ctx.beginPath();
        ctx.arc(this.settableProperties.get("x"),
            this.settableProperties.get("y"),
            this.settableProperties.get("radius"),
            0, 
            Math.PI * 2, true);
        ctx.closePath();
        ctx.fillStyle = this.settableProperties.get("color");
        ctx.fill();
    }
}
