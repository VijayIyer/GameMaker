import { Action } from "../Actions/Action";
import { Control } from "../Controls/controls";
import { BaseInteraction, Check, Interaction, NearBy } from "../Interactions/interaction.js";
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
    controlActionMap:Array<[string, Control, Action]>;
    model:GameModel; // should hold all the data
    interactions:Array<Interaction> = [];
    constructor(model:GameModel){
        // this.addSpritesButton = new AddSpritesView(this.sprites);
        this.model = model;
        this.controlActionMap = [];
    
    }
    update():void{
        this.controlActionMap.forEach(elmnt=>{
            for(let sprite of this.model.sprites){
                if(sprite.name == elmnt[0]){
                    
                    if(elmnt[1].isTriggered()){
                        console.log(elmnt[2].description);
                            elmnt[2].act(sprite);
                    }
                }
                
            }
        });

       this.interactions.forEach(interaction=>{
           interaction.do();
       });

    }
    createNewSprite(sprite:Sprite):void{
        console.log("adding sprite to game model");
        this.model.add(sprite);

    }
    changeSpriteProperty(sprite:Sprite, property:string, value:any):void{
        this.model.sprites.forEach(currentSprite=>{
            if(currentSprite.name == sprite.name){
                console.log("found sprite to change property");
                currentSprite.settableProperties.set(property, value);
                console.log(currentSprite.settableProperties.get(property));
            }
        });
    }
    addControlActionForSprite(name:string, control:Control, action:Action):void{
        this.model.sprites.forEach(currentSprite=>{
            console.log(currentSprite.name);
            if(currentSprite.name == name){
                console.log("found sprite to add action");
                
                this.controlActionMap.push([name, control, action]);
            }
        });
    }
    addInteraction(check:Check, spriteNames:Array<string>, 
        map:Array<[string, Action]>){
            let interactingSprites : Array<Sprite> = [];
            spriteNames.forEach(name=>{
                console.log("found sprite to add interaction");
                this.model.sprites.forEach(sprite=>{
                    if(sprite.name == name){
                        interactingSprites.push(sprite);
                    }
                })
            });
            let affectedSprites:Array<[Sprite, Action]> = [];
            map.forEach((elmnt)=>{
                this.model.sprites.forEach(currentSprite=>{
                    if(elmnt[0] == currentSprite.name){
                        affectedSprites.push([currentSprite, elmnt[1]]);
                    }
                })
            });
            
            this.interactions.push(new BaseInteraction(check, interactingSprites, affectedSprites));
        }
    
    
}