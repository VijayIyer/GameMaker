import { Sprite } from "./sprite";

export class Rectangle implements Sprite{
    name:string ="Rectangle";
    private type:string = "Rectangle";
    settableProperties: Array<[string, string, string]> = [];
    constructor(x:number = 0, y:number = 0, color:string = "black", width:number= 30, 
        height:number = 30){
            this.settableProperties.push(["name", "string",this.name]);
            this.settableProperties.push(["x", "number", x.toString()]);
            this.settableProperties.push(["y", "number", y.toString()]);
            this.settableProperties.push(["color", "string", color.toString()]);
            this.settableProperties.push(["isBroken", "boolean", "false"]);
            this.settableProperties.push(["width", "number", width.toString()]);
            this.settableProperties.push(["height", "number", height.toString()]);
    }
    getPropertyNames():Array<string>{
        let arr:Array<string> = []
        this.settableProperties.forEach(prop=>arr.push(prop[0]));
        return arr;
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
    setValue(key:string, val:string): void {
        let indx = this.settableProperties.findIndex(prop=>prop[0] == key);
        this.settableProperties[indx][2] = val;
    }
    update(): void {
        
    }
    draw(canvas: HTMLCanvasElement): void {
        if(this.getConvertedValue("isBroken")){
        let ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
        ctx.fillStyle=this.getConvertedValue("color") as string;
        ctx.fillRect(this.getConvertedValue("x"), 
        this.getConvertedValue("y"),
        this.getConvertedValue("width"),
        this.getConvertedValue("height"));
        }
    }
}