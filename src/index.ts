import { GameModel } from "./model/game_model.js";

import { ImageSprite } from "./model/image_sprite.js";
import { ClockSprite, TextSprite } from "./model/text_sprites.js";
import { Circle} from "./model/circle_sprite.js";
import { Rectangle } from "./model/rectangle_sprite.js";
import { Action, BlowUp, DecreaseTime, IncreaseTime, MoveDown, MoveLeft, MoveRight, MoveUp } from "./Actions/Action.js";
import { Sprite } from "./model/sprite.js";
import { GameMakerController } from "./Controller/game_maker_controller.js";
import { BaseControl } from "./Controls/controls.js";
import { IsBroken, NearBy } from "./Interactions/interaction.js";
import { NewGameDetailsView, NewGameFormView } from "./view/game_maker_views.js";
let parentDiv = document.getElementById("container") as HTMLElement;

function run(){

    // if user clicks 'New Game'
    let newGameBtn = document.getElementById("newGameBtn");
    newGameBtn?.addEventListener("click", ()=>{
        let newGameForm = new NewGameFormView();    
        newGameForm.render(parentDiv);        
    });

    // if user clicks 'Changes to saved game'
    let changeSavedGameBtn = document.getElementById("changeSavedGameBtn");
    changeSavedGameBtn?.addEventListener("click", ()=>{
        
        });
    
    }
window.addEventListener("load", run);

/*
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
    function startGame(){
        previewCanvas.getContext('2d')?.clearRect(0, 0, previewCanvas.width, previewCanvas.height);
        controller.update();
        game.draw(previewCanvas);
        window.requestAnimationFrame(startGame);
        }
    startGame();
});
// testing controller

// setting triggering logic for key
let leftArrowKeyCtrl = new BaseControl();
let rightArrowKeyCtrl = new BaseControl();
let upArrowKeyCtrl = new BaseControl();
let downKeyCtrl = new BaseControl();

document.addEventListener("keydown", (e)=>{
    if(e.key == "ArrowLeft"){
        console.log("left key held down");
        leftArrowKeyCtrl.setTriggered(true);
    }
    if(e.key == "ArrowUp"){
        upArrowKeyCtrl.setTriggered(true);
    }
    if(e.key == "ArrowRight"){
        rightArrowKeyCtrl.setTriggered(true);
    }
    if(e.key == "ArrowDown"){
        downKeyCtrl.setTriggered(true);
    }
});
document.addEventListener("keyup", (e)=>{
    if(e.key == "ArrowLeft"){
        console.log("left key held down");
        leftArrowKeyCtrl.setTriggered(false);
    }
    if(e.key == "ArrowUp"){
        upArrowKeyCtrl.setTriggered(false);
    }
    if(e.key == "ArrowRight"){
        rightArrowKeyCtrl.setTriggered(false);
    }
    if(e.key == "ArrowDown"){
        downKeyCtrl.setTriggered(false);
    }
});


let game = new GameModel();
let circle1 = new Circle(30, 30, "blue", 50);
circle1.name = "circle1";
game.add(circle1);
let rect1 = new Rectangle(100, 80, "black", 20, 30);
rect1.name ="rect1";
game.add(rect1);
let clock1 = new ClockSprite("0", 80, 100, 30, "20px serif");
clock1.name = "clock1";
game.add(clock1);
let controller = new GameMakerController(game);
controller.addControlActionForSprite("circle1", leftArrowKeyCtrl, new MoveLeft(2));
controller.addControlActionForSprite("circle1", rightArrowKeyCtrl, new MoveRight(2));
controller.addControlActionForSprite("circle1", upArrowKeyCtrl, new MoveUp(2));
controller.addControlActionForSprite("circle1", downKeyCtrl, new MoveDown(2));
let map:Array<[string, Action]> =[];
map.push(["rect1", new BlowUp()]);
controller.addInteraction(new NearBy(), 
    ["circle1", "rect1"], 
    map);
let map2:Array<[string, Action]> =[];
map2.push(["clock1", new IncreaseTime()]);
// controller.addInteraction(new NearBy(), 
//     ["circle1", "clock1"], 
//     map2);
controller.addInteraction(new IsBroken(), ["rect1"], map2);

// run using startGame function

// setInterval(()=>{
//     previewCanvas.getContext('2d')?.clearRect(0, 0, previewCanvas.width, previewCanvas.height);
//     controller.update();
//     game.draw(previewCanvas);
// }, 10);
*/

// let soundSrcList = document.getElementById("soundSourcesList") as HTMLSelectElement;
// soundPaths.forEach(path=>{
//     console.log(path);
//     let option = document.createElement("option");
//     option.innerHTML = path;
//     option.value = path;
//     soundSrcList?.appendChild(option);
// })
// let audioSrc = document.getElementById("audioSrc") as HTMLAudioElement;
// soundSrcList?.addEventListener("change", (e)=>{
//     audioSrc.setAttribute("src", soundSrcList.value);
// });
// let playing = false;
// let audioBtn = document.getElementById("playAudio") as HTMLButtonElement;
// audioBtn.addEventListener("click", ()=>{
//     if(playing){
//         audioSrc.pause();
//         playing = false;
//     }
//     else{

//         audioSrc.play();
//         playing = true;
//     }
    
// });

