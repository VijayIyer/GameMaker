import { Interaction } from "../Interactions/interaction.js";
import { ImageSprite } from "./image_sprite.js";
import { Sprite } from "./sprite";
export class GameModel implements Sprite{
    name:string ="";
    settableProperties: Map<string, any> = new Map<string, any>();
    sprites:Array<Sprite> = [];
    backgroundSprite:ImageSprite;
    interactions:Array<Interaction> =[];
    constructor(){
        this.backgroundSprite = new ImageSprite();
    }
    getPropertyNames(): Array<string> {
        return [];
    }
    add(sprite:Sprite){
        console.log("adding sprite");
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
        let newSprites:Array<Sprite> = [...this.sprites];
        //newSprites.unshift(this.backgroundSprite);
        for(let sprite of newSprites){
            sprite.draw(canvas);
        }
    }
    update(): void {
        
    }

}