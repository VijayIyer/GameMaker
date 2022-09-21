import { Sprite } from "./sprite";

export class TextSprite implements Sprite{
    name:string = "Text";
    settableProperties: Array<[string, string, string]> = [];
    constructor(text:string = "text", x:number = 10, y:number = 10, 
    width:number = 5, font:string = "20px serif"){
        this.settableProperties.push(["name", "string", this.name]);
        this.settableProperties.push(["content","string", text]);
        this.settableProperties.push(["x", "number", x.toString()]);
        this.settableProperties.push(["y", "number", y.toString()]);
        this.settableProperties.push(["font", "string", font]);
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
    getPropertyNames(): string[] {
        let arr:Array<string> = []
        this.settableProperties.forEach(prop=>arr.push(prop[0]));
        return arr;
    }
    draw(canvas:HTMLCanvasElement):void{
        let ctx:CanvasRenderingContext2D =canvas.getContext("2d") as CanvasRenderingContext2D;
        ctx.font = this.getConvertedValue("font");
        ctx.fillText(this.getConvertedValue("content"),
        this.getConvertedValue("x"), 
        this.getConvertedValue("y"));
    }
}

export class ClockSprite extends TextSprite{
    name:string = "Clock";
    private type:string = "Clock";
    time:number = 0;
    update():void{

    }
    constructor(text:string = "text", x:number = 10, y:number = 10, 
    width:number = 5, font:string = "20px serif"){
        super("text", 10, 10, 5, "20px serif");

        this.settableProperties.push(["name", "string", this.name]);
    }
    reset():void{
        
    }
    draw(canvas:HTMLCanvasElement):void{
        let ctx:CanvasRenderingContext2D =canvas.getContext("2d") as CanvasRenderingContext2D;
        ctx.font = this.getConvertedValue("font");
        ctx.fillText(this.getConvertedValue("time"),
            this.getConvertedValue("x"), 
            this.getConvertedValue("y"));
    }
    
}