import { Action, MoveDown, MoveLeft, MoveRight, MoveUp } from "./Actions/Action.js";
import { Circle } from "./model/circle_sprite.js";
import { ImageSprite } from "./model/image_sprite.js";
import { Rectangle } from "./model/rectangle_sprite.js";
import { SoundSprite } from "./model/sound_sprites.js";
import { Sprite } from "./model/sprite.js";
import { ClockSprite, TextSprite } from "./model/text_sprites.js";
import {BaseControl, Control} from "./Controls/controls.js";


export const presetTemplateSpriteNames = ["Circle", "Rectangle", "Sound", "Text", "Clock"];
export const presetTemplateSprites:Array<Sprite> = [new Circle(10, 10, "red", 5),
     new Rectangle(10, 10, "blue", 10, 10), 
     new SoundSprite(),
     new TextSprite("Content", 30, 30, 10, "20px Arial"), new ClockSprite("5", 20, 10, 15)];
export const controls:Array<string> = ["left Arrow Key", "right Arrow Key", "up Arrow Key", 
                    "down Arrow Key", "timer"];
let leftArrowKeyCtrl = new BaseControl();
leftArrowKeyCtrl.description = "left Arrow Key";
let rightArrowKeyCtrl = new BaseControl();
rightArrowKeyCtrl.description ="right Arrow Key";
let upArrowKeyCtrl = new BaseControl();
upArrowKeyCtrl.description = "up Arrow Key";
let downKeyCtrl = new BaseControl();
downKeyCtrl.description = "down Arrow Key";
let timeCtrl = new BaseControl();
timeCtrl.description = "timer";
timeCtrl.setTriggered(true);

document.addEventListener("keydown", (e)=>{
     if(e.key == "ArrowLeft"){
          leftArrowKeyCtrl.setTriggered(true);
     }
     if(e.key == "ArrowRight"){
          rightArrowKeyCtrl.setTriggered(true)
     }
     if(e.key == "ArrowUp"){
          upArrowKeyCtrl.setTriggered(true);
     }
     if(e.key == "ArrowDown"){
          downKeyCtrl.setTriggered(true);
     }
     
});
document.addEventListener("keyup", (e)=>{
     if(e.key == "ArrowLeft"){
          leftArrowKeyCtrl.setTriggered(false);
     }
     if(e.key == "ArrowRight"){
          rightArrowKeyCtrl.setTriggered(false)
     }
     if(e.key == "ArrowUp"){
          upArrowKeyCtrl.setTriggered(false);
     }
     if(e.key == "ArrowDown"){
          downKeyCtrl.setTriggered(false);
     }
});

export const controlObjects:Array<Control> 
     = [leftArrowKeyCtrl, rightArrowKeyCtrl, upArrowKeyCtrl, downKeyCtrl, timeCtrl]                    
export const actions:Array<string> = ["move left", "move right", "move up", "move down"];
export const actionObjects:Array<Action>
     = [new MoveLeft(1), new MoveRight(1), new MoveUp(1), new MoveDown(1)];
