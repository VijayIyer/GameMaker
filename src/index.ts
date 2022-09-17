import { GameModel } from "./model/game_model.js";
import {presetSprites} from "./constants.js";
import { ImageSprite } from "./model/image_sprite.js";
import { ClockSprite } from "./model/text_sprites.js";
import { Ball, Breakable } from "./model/circle_sprite.js";
let parentDiv = document.getElementById("container") as HTMLElement;


let spritePreviewCanvas = document.getElementById("spritePreview") as HTMLCanvasElement;
presetSprites.forEach(sprite=>{
    sprite.draw(spritePreviewCanvas);
});
let clock = new ClockSprite("5");
let imgSprite = new ImageSprite();
imgSprite.setImageSrc("/src/assets/parallax-forest-back-trees.png");
imgSprite.draw(spritePreviewCanvas);

let ball = new Ball();
let brick = new Breakable();

let gameModel = new GameModel();
//gameModel.backgroundSprite = imgSprite;
gameModel.add(clock);

gameModel.add(ball);
gameModel.add(brick);
let previewCanvas = document.getElementById("preview") as HTMLCanvasElement;
gameModel.draw(previewCanvas);

let addBackgroundButton = document.getElementById("addBackgroundPicBtn") as HTMLElement;
addBackgroundButton.addEventListener("click",()=>{
    let inputFile = document.getElementById("uploadedFile") as HTMLInputElement;
    inputFile.click();
    console.log(inputFile.value);
    imgSprite.setImageSrc(inputFile.value);
    imgSprite.draw(spritePreviewCanvas);
});

   
   
