import {Rectangle} from "../model/rectangle_sprite";
import { Sprite } from "../model/sprite";
export interface Action{
    description:string;
    act(model:Sprite):void;
}
export interface Effect{
    description:string;
    act(model:Rectangle):void;
}
export class BaseAction implements Action{
    amt:number = 2;
    description: string = "";
    constructor(amt:number){
        this.amt = amt;
    }
    setAmt(x:number){
        this.amt = x;
    }
    act(model: Sprite): void {
        
    }
}
export class MoveLeft extends BaseAction{
    constructor(amt:number){
        super(amt);
        this.description = "move left";
    }
    act(shape: Sprite): void {
        super.act(shape);
        if(shape.settableProperties.get("x") != undefined){
            shape.settableProperties.set("x", shape.settableProperties.get("x") - this.amt);
        }
    }
}
export class MoveRight extends BaseAction{
    constructor(amt:number){
        super(amt);
        this.description = "move right";
    }
    act(shape: Sprite): void {
        super.act(shape);
        if(shape.settableProperties.get("x") != undefined){
            shape.settableProperties.set("x", shape.settableProperties.get("x") + this.amt);
        }
        
        // console.log(shape.settableProperties.get("x"));
    }
}
export class MoveUp extends BaseAction{
    constructor(amt:number){
        super(amt);
        this.description = "move up";
    }
    act(shape: Sprite): void {
        super.act(shape);
        // shape.settableProperties.set("y", shape.settableProperties.get("y") - this.amt);
        // console.log(shape.settableProperties.get("y"));
    }
}
export class MoveDown extends BaseAction{
    constructor(amt:number){
        super(amt);
        this.description = "move down";
    }
    act(shape: Sprite): void {
        super.act(shape);
        if(shape.settableProperties.get("y") != undefined){
            shape.settableProperties.set("y", shape.settableProperties.get("y") + this.amt);
        }
    }
}
export class Break implements Effect{
    description: string;
    constructor(){
        this.description = "break!";
    }
    act(shape: Rectangle): void {
        if(shape.settableProperties.get("isBroken") != undefined){
            shape.settableProperties.set("isBroken", true);
        }
        
    }
}
export class CompundAction implements Action{
    description: string = "";
    actions:Array<Action>;
    constructor(){
        this.actions = [];
    }
    act(shape:Sprite){
        this.actions.forEach(action=>action.act(shape));
    }
}
export class MoveX implements Action{
    description:string = "Move Horizontally"
    amt:number = 2;
    constructor(amt:number = 2){
        this.amt = amt;
    }
    act(model: Sprite): void {
        // model.x += this.amt;
    }
    setAmt(amt:number){
        this.amt = amt;
    }
}
export class MoveY implements Action{
    description:string = "Move Vertically"
    amt:number = 2;
    constructor(amt:number = 2){
        this.amt = amt;
    }
    act(model: Sprite): void {
        // model.y += this.amt;
    }
    setAmt(amt:number){
        this.amt = amt;
    }
}

export class Bouncing implements Action{
    vx:number;
    vy:number;
    description:string = "bouncing!";
    constructor(vx:number, vy:number){
        this.vx = vx;
        this.vy = vy;
        
    }
    act(sprite:Sprite){
        // sprite.settableProperties.get("x") += this.vx;
        // sprite.y += this.vy;
    }
    changeBothDirections(){
        this.vx = -this.vx;
        this.vy = -this.vy;
    }
    changeXDirection(){
        this.vx = -this.vx;
    }
    changeYDirection(){
        this.vy = -this.vy;
    }
    
}
