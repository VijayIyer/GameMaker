import { Sprite } from "./sprite";

export class Ball implements Sprite{
    readonly name:string ="Ball";
    x:number;
    y:number;
    vx:number;
    vy:number;
    color:string;
    radius:number;
    settableProperties: Map<string, any> = new Map<string, any>();
    constructor(){
        this.vx = 0;
        this.vy = 0;
        this.x = 10;
        this.y = 10;
        this.color = "red";
        this.radius = 20;
        this.settableProperties.set("x", 100);
        this.settableProperties.set("y", 200);
        this.settableProperties.set("color", this.color);
        this.settableProperties.set("radius", this.radius);
        this.settableProperties.set("width", 30);
        this.settableProperties.set("height", 30);
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
export class Breakable implements Sprite, Breakable{
    readonly name:string ="Brick";
    x:number;
    y:number;
    height:number;
    width:number;
    color:string;
    isBroke:boolean = false;
    settableProperties: Map<string, any> = new Map<string, any>();
    constructor(){
        this.x = 100;
        this.y = 200;
        this.height = 30;
        this.width = 30;
        this.color = "black";
        this.settableProperties.set("x", 30);
        this.settableProperties.set("y", 30);
        this.settableProperties.set("color", "black");
        // console.log(this.settableProperties.get("y"));
        this.settableProperties.set("width", 30);
        this.settableProperties.set("height", 30);
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