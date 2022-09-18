import { GameModel } from "./model/game_model.js";
import {presetSprites} from "./constants.js";
import { ImageSprite } from "./model/image_sprite.js";
import { ClockSprite, TextSprite } from "./model/text_sprites.js";
import { Circle} from "./model/circle_sprite.js";
import { Rectangle } from "./model/rectangle_sprite.js";
import { MoveDown, MoveLeft, MoveRight } from "./Actions/Action.js";
import { Sprite } from "./model/sprite.js";
let parentDiv = document.getElementById("container") as HTMLElement;

// testing it out
// create list for each preset sprite
let spritePreviewCanvas = document.getElementById("spritePreview") as HTMLCanvasElement;

    // parentDiv.innerHTML = "";
    presetSprites.forEach(sprite=>{
        let div = document.createElement("div") as HTMLElement;
        div.classList.add("spriteForPreview");
        div.innerHTML = sprite.name;
        parentDiv.appendChild(div);
     });
// });



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
                    fillSpriteDetailsPanel(selectedSprite);
                }
            })
        });
    }
    //show selected sprite details
    function fillSpriteDetailsPanel(selectedSprite:Sprite){
    let spriteDetailsPanel = document.getElementById("spriteDetails") as HTMLElement;
    spriteDetailsPanel.innerHTML = "";
    selectedSprite.getPropertyNames().forEach(property=>{
        let container = document.createElement("div");
        
        // label
        let propertyLabel = document.createElement("label") as HTMLElement;
        propertyLabel.setAttribute("for", property);
        propertyLabel.innerHTML = property;
        
        // input
        let propertyInput = document.createElement("input");
        propertyInput.setAttribute("id", property);

        container.appendChild(propertyLabel);
        container.appendChild(propertyInput);
        spriteDetailsPanel.appendChild(container);
        spriteDetailsPanel.appendChild(container);

       });
    let button = document.createElement("button") as HTMLElement;
    button.innerHTML = "Change Selected Sprite Properties";
    button.classList.add("addBtn");
    spriteDetailsPanel.appendChild(button);
    button.addEventListener("click", ()=>{
        for(let k of selectedSprite.settableProperties.keys()){
            selectedSprite.settableProperties.set(k, 
                (document.getElementById(k) as HTMLInputElement).value)
            }
        });
    }

    let model = new GameModel();
// addSelectedSprite click handling -> add a copy of the spite to gameModel
document.getElementById("addSelectedSprite")?.addEventListener("click", ()=>{
    console.log(selectedSprite.name);
    switch(selectedSprite.name){
        case "Text":{
            model.add(new TextSprite());
            break;
        }
        case "Image":{
            model.add(new ImageSprite());
            break;
        }
        case "Circle":{
            model.add(new Circle()); 
            break;
        }
        case "Rectangle":{
            model.add(new Rectangle());
            break;
        }
    }
});

let text = new TextSprite("Content");
let imgSprite = new ImageSprite();
imgSprite.setImageSrc("/src/assets/parallax-forest-middle-trees.png");
// imgSprite.draw(spritePreviewCanvas);

let ball = new Circle();
let brick = new Rectangle();

let gameModel = new GameModel();
//gameModel.backgroundSprite = imgSprite;
gameModel.add(text);
gameModel.add(ball);
gameModel.add(brick);
let previewCanvas = document.getElementById("preview") as HTMLCanvasElement;
//gameModel.draw(previewCanvas);

let addBackgroundButton = document.getElementById("addBackgroundPicBtn") as HTMLElement;
addBackgroundButton.addEventListener("click",()=>{
    let inputFile = document.getElementById("uploadedFile") as HTMLInputElement;
    inputFile.click();
    console.log(inputFile.value);
    imgSprite.setImageSrc(inputFile.value);
    imgSprite.draw(spritePreviewCanvas);
});

let action1 = new MoveRight(1);
let action2 = new MoveDown(2);
function redraw(){
    console.log("redraw");
    previewCanvas.getContext('2d')?.clearRect(0, 0, previewCanvas.width, previewCanvas.height);
    action1.act(model.sprites[0]);
    action2.act(model.sprites[1]);
    model.draw(previewCanvas);
    window.requestAnimationFrame(redraw);
}

document.getElementById("startGame")?.addEventListener("click", ()=>{
    if(model.sprites.length > 2){
        redraw();
    }
});