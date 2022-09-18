import { Action } from "../Actions/Action";
import { Sprite } from "../model/sprite";

export interface Interaction{
    description:string;
    interactingSprites:Array<Sprite>;
    map:Map<Sprite, Action>;
    interacted():boolean;
    afterMath():void;
}

export class BaseInteraction implements Interaction{
    description: string = "";
    interactingSprites: Sprite[];
    map:Map<Sprite, Action> = new Map<Sprite, Action>();
    constructor(interactingSprites:Array<Sprite>){
        this.interactingSprites = interactingSprites;
    }
    interacted(): boolean {
        return false;
    }
    afterMath(): void {
        this.map.forEach((action, sprite)=>{
            action.act(sprite);
        });
    }
}
export class NearBy extends BaseInteraction{
    description:string ="detect if the 2 sprites are nearby";

    interacted(): boolean {
        return false;
    }
}