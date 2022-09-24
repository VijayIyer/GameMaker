import { Sprite } from "./sprite";

export class Circle implements Sprite{
    name:string ="Circle";
    private type:string = "Circle";
    settableProperties:Array<[string, string, string]> = [];
    constructor(x:number = 10, y:number = 20, color:string = "red", 
        radius:number = 20, width:number = 20, height:number = 30){
        this.settableProperties.push(["name", "string",this.name]);
        this.settableProperties.push(["x", "number", x.toString()]);
        this.settableProperties.push(["y", "number", y.toString()]);
        this.settableProperties.push(["color", "string", color.toString()]);
        this.settableProperties.push(["radius", "number", radius.toString()]);
        this.settableProperties.push(["width", "number", width.toString()]);
        this.settableProperties.push(["height", "number", height.toString()]);
    }
    getPropertyNames():Array<string>{
        let arr:Array<string> = []
        this.settableProperties.forEach(prop=>arr.push(prop[0]));
        return arr;
    }
    update(): void {
        
    }
    setValue(key:string, val:string): void {
        let indx = this.settableProperties.findIndex(prop=>prop[0] == key);
        this.settableProperties[indx][2] = val;
    }
    getConvertedValue(key:string){
        let found = this.settableProperties.find(prop=> prop[0] == key);
        if(found == undefined){
            found = ["", "number", "0"];
        }
        let val:any;
        switch(found[1]){
            case "number":val = parseInt(found[2]);
                        break;
            case "string": val = found[2];
                break;
            case "boolean":val = Boolean(found[2]);
                break;
            default:val = found[2];
                break;
        }
        return val;
    }
    
    draw(canvas: HTMLCanvasElement): void {
        let ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
        ctx.beginPath();
        ctx.arc(this.getConvertedValue("x"),
        this.getConvertedValue("y"),
        this.getConvertedValue("radius"),
            0, 
            Math.PI * 2, true);
        ctx.closePath();
        ctx.fillStyle = this.getConvertedValue("color");
        ctx.fill();
    }
}
