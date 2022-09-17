import { Sprite } from "./sprite";

export class ImageSprite implements Sprite{
    src:string ="";
    setImageSrc(src:string){
        this.src = src;
    }
    update(): void {
        
    }
    draw(canvas: HTMLCanvasElement): void {
        if(this.src == ""){
            
        }
        else{
            let img = document.createElement("img") as HTMLImageElement;
            img.addEventListener("load", ()=>{
                let ctx:CanvasRenderingContext2D = canvas.getContext('2d') as CanvasRenderingContext2D;
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            });
            img.src = this.src;
        }
    }
}