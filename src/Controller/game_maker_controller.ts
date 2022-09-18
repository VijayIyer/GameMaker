import { Action } from "../Actions/Action";
import { Control } from "../Controls/controls";
import { GameModel } from "../model/game_model";
import { Sprite } from "../model/sprite";
// import { GameModel } from "../Model/GameModel";
// import { Sprite } from "../Model/sprite";
// import { AddSpritesView, SpriteOptionView } from "../View/add_sprites_view.js";

export interface Controller{
    update():void; // play out all interactions, behaviours
}

export class GameMakerController implements Controller{
    // addSpritesButton:AddSpritesView; // should notify controller about new sprite
    controlActionMap:Map<Sprite, Map<Control, Action>>;
    model:GameModel; // should hold all the data
    constructor(model:GameModel, private sprites:Array<Sprite>){
        // this.addSpritesButton = new AddSpritesView(this.sprites);
        this.model = model;
        this.controlActionMap = new Map<Sprite, Map<Control, Action>>();
    
    }
    update():void{
        for(let sprite of this.controlActionMap.keys()){
        let map:Map<Control, Action> = this.controlActionMap.get(sprite) as Map<Control, Action>;
        map.forEach((action, control)=>{
            if(control.isTriggered()){
                console.log(action.description);
                action.act(sprite);
                }
            });
       }
    }
    createNewSprite(sprite:Sprite):void{
        console.log("adding sprite to game model");
        this.model.add(sprite);

    }
    changeSpriteProperty(sprite:Sprite, property:string, value:any):void{
        this.sprites.forEach(currentSprite=>{
            if(currentSprite == sprite){
                console.log("found sprite to change property");
                currentSprite.settableProperties.set(property, value);
                console.log(currentSprite.settableProperties.get(property));
            }
        });
    }
    addControlActionForSprite(sprite:Sprite, control:Control, action:Action):void{
        this.sprites.forEach(currentSprite=>{
            if(currentSprite == sprite){
                let map = new Map<Control, Action>();
                map.set(control, action);
                this.controlActionMap.set(sprite, map);
            }
        });
    }
    
    
}