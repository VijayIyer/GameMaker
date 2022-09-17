import { Sprite } from "./sprite";

export class ImageSprite implements Sprite{
    src:string ="";
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
                
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            });
            img.src = this.src;
        }
    }
}