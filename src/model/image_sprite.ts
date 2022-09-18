import { Sprite } from "./sprite";

export class ImageSprite implements Sprite{
    name:string = "Image";
    settableProperties: Map<string, any> = new Map<string, any>();
    img:HTMLImageElement;
    src:string;
    constructor(){
        this.img = document.createElement("img") as HTMLImageElement;
        this.src = "";
    }
    setImageSrc(src:string){
        this.src = src;
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