import { GameMakerController } from "../Controller/game_maker_controller.js";
import { GameModel } from "../model/game_model.js";
import { Sprite } from "../model/sprite.js";

function playGame(controller:GameMakerController){
    let gameCanvas = document.getElementById("preview") as HTMLCanvasElement;
    let pauseBtn = document.getElementById("pauseGameBtn") as HTMLElement;
    let x = window.requestAnimationFrame(play);
    pauseBtn.addEventListener("click", ()=>{
        console.log("pausing game");
        window.cancelAnimationFrame(x);
    });
    console.log(controller.controlActionMap);
    function play(){
        
        gameCanvas.getContext('2d')?.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
        controller.update();
        controller.draw(gameCanvas);
        x = window.requestAnimationFrame(play);
    }
    
}

export class NewGameFormView{
    render(parent:HTMLElement):void{
        fetch("/src/view/new_game_form.html")
        .then(res=>res.text())
        .then(data=>{
            parent.innerHTML = data;
            })
        .then(()=>{
            let createGameBtn = document.getElementById("createGameBtn") as HTMLElement;
        createGameBtn.addEventListener("click", ()=>{
            let name = document.getElementById("newGameId") as HTMLInputElement;
            // name.value = name.value==""?name.value:"defaultGame";
            let gameModel = new GameModel(name.value);
            let controller = new GameMakerController(gameModel);
            new NewGameDetailsView(name.value, controller).render(parent);
            });
            })
        }
    }
export class SpritePropertiesView{
    constructor(private name:string, private type:string, private controller:GameMakerController){

    }
    render(parent:HTMLElement){
       parent.innerHTML = "";
       parent.setAttribute("spriteType", this.type);
       this.controller.getPropertyNames(this.name).forEach(name=>{
        let labelInputDiv = document.createElement("div");   
        let label = document.createElement("label");
           label.innerHTML = name;
           let input = document.createElement("input");
           input.value = this.controller.getPropertyValue(this.name, name);
           input.setAttribute("id", name);
           input.classList.add("spriteProperty");
           labelInputDiv.appendChild(label);
           labelInputDiv.appendChild(input);
           parent.appendChild(labelInputDiv);

       });
    }
}
export class ControlActionsCellView{
    constructor(private controller:GameMakerController){

    }
    render(parent:HTMLElement){
        fetch("/src/view/control_actions_view_row.html")
                .then(res=>res.text())
                .then(data=>{
                    parent.innerHTML = data;
                })
                .then(()=>{
                    let cells = parent.querySelectorAll("td");
                    
                    let actions = this.controller.getActions();
                    let controls = this.controller.getControls();
                    let select1 = cells[0].querySelector("select") as HTMLSelectElement;
                    controls.forEach(ctrl=>{
                        let option = document.createElement("option");
                        option.innerHTML = ctrl;
                        select1.options.add(option);
                        
                    });
                    let select2 = cells[1].querySelector("select") as HTMLSelectElement;
                    actions.forEach(action=>{
                        let option = document.createElement("option");
                        option.innerHTML = action;
                        select2.options.add(option);
                        
                    });
                });
    }
}
export class ControlActionsTableView{
    constructor(private controller:GameMakerController){

    }
    render(parent:HTMLElement){
        parent.innerHTML = "";
        
        fetch("/src/view/control_actions_view_table.html")
        .then(res=>res.text())
        .then(data=>{
            parent.innerHTML = data;
        })
    }
}
export class AddActionsView{
    constructor(private controller:GameMakerController){

    }
    render(parent:HTMLElement){
        parent.innerHTML = "";
        fetch("/src/view/add_control_action.html")
        .then(res=>res.text())
        .then(data=>{
            parent.innerHTML = data;
        })
        .then(()=>{
            let btn = document.getElementById("addControlActionRow") as HTMLElement;
            btn.addEventListener("click", ()=>{
                console.log("add row");
                let table = document.getElementById("controlActionsTable") as HTMLTableElement;
                let row = document.createElement("tr") as HTMLTableRowElement;
                table?.appendChild(row);
                new ControlActionsCellView(this.controller).render(row);
            });
        })
    }
}
export class spriteTemplateOption{
    constructor(private controller:GameMakerController){

    }
    render(name:string,parent:HTMLElement){
        
        let div = document.createElement("div");
        div.innerHTML = name;
        div.classList.add("spriteTemplateOption");
        div.setAttribute("spriteType", name);
        div.addEventListener("click", ()=>{
            let previewCanvas = document.getElementById("spritePreviewCanvas") as HTMLCanvasElement;
            previewCanvas.getContext('2d')?.clearRect(0, 0, previewCanvas.width, previewCanvas.height);
            this.controller.getSprite(name.trim()).draw(previewCanvas);
            let spritePropertiesDiv = document.getElementById("spriteProperties") as HTMLElement;
            let controlActionsDiv = document.getElementById("controlActions") as HTMLElement;
            let addActionsDiv = document.getElementById("addActions") as HTMLElement;
            let spriteType:string = div.getAttribute("spriteType") as string;
            new SpritePropertiesView(name.trim(), spriteType,this.controller).render(spritePropertiesDiv);
            new ControlActionsTableView(this.controller).render(controlActionsDiv);
            new AddActionsView(this.controller).render(addActionsDiv);
            
        });
        parent.appendChild(div);
        
    }
}
export class spriteTemplateList{
    constructor(private controller:GameMakerController){

    }
    render(parent:HTMLElement){
        fetch("/src/view/sprite_template_list.html")
        .then(res=>res.text())
        .then(data=>{
            parent.innerHTML = data;
        })
        .then(()=>{
            let spriteTemplateList = document.getElementById("spriteTemplateList") as HTMLElement;
            this.controller.presetSpriteTemplateNames.forEach(name=>{
                new spriteTemplateOption(this.controller).render(name, spriteTemplateList);
            })
        });
    }
}
export class NewGameDetailsView{
    constructor(private name:string, private controller:GameMakerController){
        
    }
    render(parent:HTMLElement):void{
        parent.innerHTML = "";
        fetch("/src/view/new_game_details.html")
        .then(res=>res.text())
        .then(data=>{
            parent.innerHTML = data;
        })
        .then(()=>{
            document.getElementById("startGameBtn")?.addEventListener("click", ()=>{
                playGame(this.controller);
            });
            
        })
        .then(()=>{
            let presetSpritesBtn = document.getElementById("presetSprites") as HTMLElement;
            let spriteTemplateListParent = document.getElementById("spriteTemplateList") as HTMLElement;
            presetSpritesBtn.addEventListener("click", ()=>{
                this.controller.presetSpriteTemplateNames.forEach(name=>{
                    let view = new spriteTemplateList(this.controller);
                    view.render(spriteTemplateListParent);
                })
            });
        })
        .then(()=>{
            let addSpriteBtn = document.getElementById("addSpriteBtn") as HTMLElement;
            addSpriteBtn.addEventListener("click", ()=>{
                // type
                let type:string = "";
                if(document.getElementById("spriteProperties")){
                    let elmnt = document.getElementById("spriteProperties") as HTMLElement;
                    if(elmnt.getAttribute("spriteType") != null){
                        type = elmnt.getAttribute("spriteType") as string;
                    
                    }else{
                        type = "Undefined";
                    }
                }
                
                
                // properties
                let properties:Map<string, string> = new Map<string, string>();
                let elmnts = document.getElementById('spriteProperties')?.getElementsByTagName('input');
                if(elmnts == null){

                }else{
                    for(let elmnt of elmnts){
                        let val = elmnt.value;
                        properties.set(elmnt.id, val);
    
                    }
                }
                
                 // selected control actions
                let controlActions:Array<[string, string]> = [];
                let table = document.getElementById("controlActionsTable");
                let rows = table?.querySelectorAll("tr:not(:first-child)");
                 
                rows?.forEach(row=>{
                    let cells = row.querySelectorAll("td");
                    let selecElmnt1 = cells[0].querySelector("select") as HTMLSelectElement;
                    let val1 = selecElmnt1.selectedOptions[0];
                    let selecElmnt2 = cells[1].querySelector("select") as HTMLSelectElement;
                    let val2 = selecElmnt2.selectedOptions[0];
                    controlActions.push([val1.innerHTML, val2.innerHTML]);
                });

                // add Sprite to game model in controller
                this.controller.addSprite(type, properties, controlActions);
                
            })
        });
 
    }
}

