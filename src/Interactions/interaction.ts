import { Action } from "../Actions/Action";
import { Sprite } from "../model/sprite";

export interface Check{
    conditionTrue(interactingSprites:Array<Sprite>):boolean;
}

export interface Interaction{
    description:string;
    check:Check;
    interactingSprites:Array<Sprite>;
    map:Array<[Sprite, Action]>;
    do():void;
}

export class BaseInteraction implements Interaction{
    description: string = "";
    interactingSprites: Sprite[];
    check: Check;
    map:Array<[Sprite, Action]> = [];
    constructor(check:Check, interactingSprites:Array<Sprite>, 
        map:Array<[Sprite, Action]> = [])
        {
        this.interactingSprites = interactingSprites;
        this.check = check;
        this.map =map;
    }
    do() {
        if(this.check.conditionTrue(this.interactingSprites)){
            this.map.forEach((actionSprite)=>{
                actionSprite[1].act(actionSprite[0]);
            });
        }
    }
}
export class NearBy implements Check{
    description:string ="detect if the 2 sprites are nearby";

    conditionTrue(interactingSprites: Sprite[]): boolean {
        return (interactingSprites[0].settableProperties.get("x") >
         interactingSprites[1].settableProperties.get("x"))
         && (interactingSprites[0].settableProperties.get("y") 
         > interactingSprites[1].settableProperties.get("y") - 30); 
        
    }
}
export class IsBroken implements Check{
    description:string="check if broken";
    conditionTrue(interactingSprites: Sprite[]): boolean {
        if(interactingSprites[0].settableProperties.get("isBroken")){
            return true;
        }
        return false;
    }
}