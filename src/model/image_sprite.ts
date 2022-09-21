import { Sprite } from "./sprite";

export class ImageSprite implements Sprite{
    name:string = "Image";
    private type:string = "Image";
    settableProperties: Array<[string, string, string]> = [];
    img:HTMLImageElement;
    src:string;
    constructor(){
        this.img = document.createElement("img") as HTMLImageElement;
        this.src = "";
        this.settableProperties.push(["name", "string",this.name]);
        this.settableProperties.push(["src", "string",this.src]);
        
    }
    getConvertedValue(key: string) {
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
    setImageSrc(src:string){
        this.src = src;
    }
    getPropertyNames(): string[] {
        return [];
    }
    update(): void {
        
    }
    draw(canvas: HTMLCanvasElement): void {
        let ctx:CanvasRenderingContext2D = canvas.getContext('2d') as CanvasRenderingContext2D;
        if(this.src == ""){
            ctx.fillStyle="red";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
        else{
            
            let img = document.createElement("img") as HTMLImageElement;
            img.addEventListener("load", ()=>{
                setTimeout(()=>{
                    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                }, 10);
            });
            img.src = this.src;
                
            //});
            
        }
    }
}