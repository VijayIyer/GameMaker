import { GameModel } from "./model/game_model.js";
import {presetSprites} from "./constants.js";
import { ImageSprite } from "./model/image_sprite.js";
import { ClockSprite, TextSprite } from "./model/text_sprites.js";
import { Circle} from "./model/circle_sprite.js";
import { Rectangle } from "./model/rectangle_sprite.js";
let parentDiv = document.getElementById("container") as HTMLElement;

// testing it out
// create list for each preset sprite
let spritePreviewCanvas = document.getElementById("spritePreview") as HTMLCanvasElement;
presetSprites.forEach(sprite=>{
    let div = document.createElement("div") as HTMLElement;
    div.classList.add("spriteForPreview");
    div.innerHTML = sprite.name;
    parentDiv.appendChild(div);
});
// show selected sprite in preview
let spritePreviews = document.getElementsByClassName("spriteForPreview");
let selectedSprite = presetSprites[0];
for(let preview of spritePreviews){
    preview.addEventListener("click", (e)=>{
        spritePreviewCanvas.getContext('2d')?.clearRect(0, 0,
             spritePreviewCanvas.width, spritePreviewCanvas.height);
        presetSprites.forEach(sprite=>{
            if(sprite.name == preview.innerHTML){
                sprite.draw(spritePreviewCanvas);
                selectedSprite = sprite;
            }
        })
    });
}
let model = new GameModel();
// addSelectedSprite click handling -> add a copy of the spite to gameModel
document.getElementById("addSelectedSprite")?.addEventListener("click", ()=>{
    switch(selectedSprite.name){
        case "Text":gameModel.add(new Rectangle());
            break;
        
        case "Image":gameModel.add(new Rectangle());
            break;
        case "Circle":gameModel.add(new Rectangle());
        case "Rectangle":gameModel.add(new Rectangle());
    
    }
    console.log(model.sprites.length);
});

let text = new TextSprite("Content");
let imgSprite = new ImageSprite();
imgSprite.setImageSrc("/src/assets/parallax-forest-middle-trees.png");
// imgSprite.draw(spritePreviewCanvas);

let ball = new Circle();
let brick = new Rectangle();

let gameModel = new GameModel();
gameModel.backgroundSprite = imgSprite;
gameModel.add(text);
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


