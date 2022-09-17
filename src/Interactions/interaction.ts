import { Sprite } from "../model/sprite";

export interface Interaction{
    description:string;
    interacted(sprite1:Sprite, sprite:Sprite):boolean;
}

export class NearBy implements Interaction{
    description:string ="detect if the 2 sprites are nearby";
    sprite1:Sprite;
    sprite2:Sprite;
    constructor(sprite1:Sprite, sprite2:Sprite){
        this.sprite1 = sprite1;
        this.sprite2 = sprite2;
    }
    interacted(sprite1: Sprite, sprite: Sprite): boolean {
        return false;
    }
}