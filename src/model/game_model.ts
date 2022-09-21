import { Interaction } from "../Interactions/interaction.js";
import { ImageSprite } from "./image_sprite.js";
import { Sprite } from "./sprite";
export class GameModel implements Sprite{
    name:string;
    private type:string;
    settableProperties: Array<[string, string, string]> = [];
    sprites:Array<Sprite> = [];
    backgroundSprite:ImageSprite;
    interactions:Array<Interaction> =[];
    constructor(name:string){
        this.type = "game Model";
        this.name = name;
        this.backgroundSprite = new ImageSprite();
        this.settableProperties.push(["name", "string", this.name]);
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
    getPropertyNames(): Array<string> {
        let arr:Array<string> = []
        this.settableProperties.forEach(prop=>arr.push(prop[0]));
        return arr;
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