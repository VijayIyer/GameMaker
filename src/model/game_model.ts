import { ImageSprite } from "./image_sprite.js";
import { Sprite } from "./sprite";
export class GameModel implements Sprite{
    sprites:Array<Sprite> = [];
    backgroundSprite:ImageSprite;
    constructor(){
        this.backgroundSprite = new ImageSprite();
    }
    add(sprite:Sprite){
        this.sprites.push(sprite);
    }
    remove(sprite:Sprite){
        for(let i=0;i<this.sprites.length;i++){
            if(this.sprites[i] == sprite){
                this.sprites.splice(i, 1);
            }
        }
    }
    draw(canvas: HTMLCanvasElement): void {
        //this.backgroundSprite.draw(canvas);
        this.sprites.forEach(sprite=>sprite.draw(canvas));
    }
    update(): void {
        
    }

}