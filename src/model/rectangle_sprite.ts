import { Sprite } from "./sprite";

export class Rectangle implements Sprite{
    readonly name:string ="Rectangle";
    settableProperties: Map<string, any> = new Map<string, any>();
    constructor(x:number = 0, y:number = 0, color:string = "black", width:number= 30, 
        height:number = 30){
        this.settableProperties.set("x", x);
        this.settableProperties.set("y", y);
        this.settableProperties.set("color", color);
        this.settableProperties.set("width",width);
        this.settableProperties.set("height", height);
    }
    getPropertyNames():Array<string>{
        let array:Array<string> = [];
        
        for(let key of this.settableProperties.keys()){
            console.log(key);
            array.push(key);
        }
        console.log(array.length);
        return array;
    }
    update(): void {
        
    }
    draw(canvas: HTMLCanvasElement): void {
        let ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
        ctx.fillStyle=this.settableProperties.get("color") as string;
        ctx.fillRect(this.settableProperties.get("x"), 
        this.settableProperties.get("y"),
        this.settableProperties.get("width"),
        this.settableProperties.get("height"));
    }
}