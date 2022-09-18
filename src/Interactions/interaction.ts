import { Action } from "../Actions/Action";
import { Sprite } from "../model/sprite";

export interface Interaction{
    description:string;
    map:Map<Sprite, Action>;
    interacted(sprite1:Sprite, sprite:Sprite):boolean;
    afterMath():void;
}

export class BaseInteraction implements Interaction{
    description: string = "";
    sprite1:Sprite;
    sprite2:Sprite;
    map:Map<Sprite, Action> = new Map<Sprite, Action>();
    constructor(sprite1:Sprite, sprite2:Sprite){
        this.sprite1 = sprite1;
        this.sprite2 = sprite2;
    }
    interacted(sprite1: Sprite, sprite: Sprite): boolean {
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

    interacted(sprite1: Sprite, sprite: Sprite): boolean {
        return false;
    }
}