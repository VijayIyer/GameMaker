import { Action, BaseAction } from "../Actions/Action.js";
import { BaseControl, Control } from "../Controls/controls.js";
import { BaseInteraction, Check, Interaction, NearBy } from "../Interactions/interaction.js";
import { GameModel } from "../model/game_model";
import { Sprite } from "../model/sprite";
import {presetTemplateSpriteNames, presetTemplateSprites, actions, controls, actionObjects, controlObjects} from "../constants.js"
import { Circle } from "../model/circle_sprite.js";
import { Rectangle } from "../model/rectangle_sprite.js";
import { ImageSprite } from "../model/image_sprite.js";
import { ClockSprite, TextSprite } from "../model/text_sprites.js";
// import { GameModel } from "../Model/GameModel";
// import { Sprite } from "../Model/sprite";
// import { AddSpritesView, SpriteOptionView } from "../View/add_sprites_view.js";

export interface Controller{
    
    update():void; // play out all interactions, behaviours
}

export class GameMakerController implements Controller{
    
    
    getSprite(spriteTemplateName: string):Sprite {
        let foundTemplate:Sprite | undefined = this.presetSpriteTemplates.find(sprite=>
            sprite.name == spriteTemplateName.trim())
            return foundTemplate?foundTemplate:new Circle();
            
    }
    // addSpritesButton:AddSpritesView; // should notify controller about new sprite
    presetSpriteTemplateNames:Array<string>;
    private presetSpriteTemplates;
    controlActionMap:Array<[string, Control, Action]>;
    private model:GameModel; // should hold all the data
    interactions:Array<Interaction> = [];
    actionNames:Array<string>;
    private actions:Array<Action> = actionObjects;
    controlNames:Array<string>;
    private controls:Array<Control> = controlObjects;
    constructor(model:GameModel){
        // this.addSpritesButton = new AddSpritesView(this.sprites);
        this.model = model;
        this.controlActionMap = [];
        this.presetSpriteTemplateNames = presetTemplateSpriteNames;
        this.presetSpriteTemplates = presetTemplateSprites;
        this.actionNames = actions;
        this.controlNames= controls;
    }
    draw(canvas:HTMLCanvasElement){
        this.model.sprites.forEach(sprite=>{
            console.log(sprite.name);
            sprite.draw(canvas);
        });
    }
    update():void{
        this.controlActionMap.forEach(elmnt=>{
            for(let sprite of this.model.sprites){
                console.log(sprite.getConvertedValue("name") +"-"+ elmnt[0]);
                if(sprite.getConvertedValue("name") == elmnt[0]){
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
    
    addSprite(type:string, properties:Map<string, string>, controlActions:Array<[string, string]>):void{
        let sprite:Sprite;
            switch(type){
                case "Circle": 
                    sprite = new Circle();
                    break;
                case "Rectangle":
                    sprite = new Rectangle();
                    break;
                case "Image":
                    sprite = new ImageSprite();
                    break;
                case "Clock":
                    sprite = new ClockSprite();
                    break;
                case "Text":
                    sprite = new TextSprite();
                    break;
                default:sprite = new ImageSprite();
                        break;
            }
            sprite.setValue("name", properties.get("name") as string);
            console.log(properties.get("name"));
            properties.forEach((value, key)=>{
                sprite.setValue(key, value);
            });
            
            this.model.add(sprite);
            controlActions.forEach(elmnt=>{
                console.log("adding -"+elmnt[0]+" - "+elmnt[1]);
                let action:Action = this.getActionByName(elmnt[1]);
                let control:Control = this.getControlByName(elmnt[0]);
                this.addControlActionForSprite(sprite.getConvertedValue("name"), control, action);
        });
    }
    getActionByName(name:string):Action{
        let foundAction = this.actions.find(action=>action.description == name);
        
        if(foundAction == undefined){
            return new BaseAction(2);
        }
        else{
            return foundAction;
        }
    }
    getControlByName(name:string):Control{
        let foundControl = this.controls.find(ctrl=>ctrl.description == name);
        
        if(foundControl == undefined){
            return new BaseControl();
        }
        else{
            return foundControl;
        }
    }
    getControls():Array<string>{
        return this.controlNames;
    }
    getActions():Array<string>{
        return this.actionNames;
    }
    getPropertyNames(name:string):Array<string>{
        return this.getSprite(name).getPropertyNames();
    }
    getPropertyValue(spriteName:string, property:string):string{
        for(let sprite of this.presetSpriteTemplates){
            if(sprite.name == spriteName){
                let foundProp = sprite.settableProperties.find(prop=>prop[0] == property);
                if(foundProp != undefined){
                    return foundProp[2];
                }
                else{
                    return "";
                }
                
            }
        }
        
            return "not found";
         
    }
    createNewSprite(sprite:Sprite):void{
        console.log("adding sprite to game model");
        this.model.add(sprite);

    }
    changeSpriteProperty(sprite:Sprite, property:string, value:any):void{
        this.model.sprites.forEach(currentSprite=>{
            if(currentSprite.name == sprite.name){
                console.log("found sprite to change property");
                currentSprite.setValue(property, value);
                console.log(currentSprite.getConvertedValue(property));
            }
        });
    }
    addControlActionForSprite(name:string, control:Control, action:Action):void{
        this.model.sprites.forEach(currentSprite=>{
            if(currentSprite.getConvertedValue("name") == name){
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