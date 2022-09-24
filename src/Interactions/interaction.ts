import { Action } from "../Actions/Action";
import { Sprite } from "../model/sprite";

export interface Check{
    isConditionTrue(interactingSprites:Array<Sprite>):boolean;
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
        if(this.check.isConditionTrue(this.interactingSprites)){
            this.map.forEach((actionSprite)=>{
                actionSprite[1].act(actionSprite[0]);
            });
        }
    }
}
export class NearBy implements Check{
    description:string ="detect if the 2 sprites are nearby";

    isConditionTrue(interactingSprites: Sprite[]): boolean {
        return (interactingSprites[0].getConvertedValue("x") >
         interactingSprites[1].getConvertedValue("x"))
         && (interactingSprites[0].getConvertedValue("y") 
         > interactingSprites[1].getConvertedValue("y") - 30); 
        
    }
}
export class IsBroken implements Check{
    description:string="check if broken";
    isConditionTrue(interactingSprites: Sprite[]): boolean {
        if(interactingSprites[0].getConvertedValue("isBroken")){
            return true;
        }
        return false;
    }
}

export class OutOfBounds implements Check{
    description:string="checking if x,y out of bounds";
    width:number;
    height:number;
    constructor(x:number = 100, y:number = 100){
        this.width = 100;
        this.height = 100;
    }
    isConditionTrue(interactingSprites: Sprite[]): boolean {
       return true;
    }
}