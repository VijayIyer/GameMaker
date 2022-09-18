export class presetSpritesListView{
    
    constructor(){

    }
    render(parentDiv:HTMLElement, names:Array<string>):HTMLElement{
        
        parentDiv.innerHTML = "";
        names.forEach(name=>{
            let div = document.createElement("div") as HTMLElement;
            div.classList.add("spriteForPreview");
            div.innerHTML = name;
            parentDiv.appendChild(div);
         });
         return parentDiv;
    }
}

export class GameMakerMenuView{
    render(parent:HTMLElement):void{
        parent.innerHTML = "";
        let button1Div = document.createElement("div") as HTMLElement;
        let button1 = document.createElement("button") as HTMLElement;
        button1.classList.add("addBtn");
        button1.setAttribute("id", "newGameBtn");
        button1.innerHTML = "New Game";
        button1Div.appendChild(button1);
        
        let button2Div = document.createElement("div") as HTMLElement;
        let button2 = document.createElement("button") as HTMLElement;
        button2.classList.add("addBtn");
        button2.setAttribute("id", "changeSavedGameBtn");
        button2.innerHTML = "Change Saved Game";
        button2Div.appendChild(button2);
        parent.appendChild(button1Div);
        parent.appendChild(button2Div);

        button1.addEventListener("click", ()=>{
            parent.innerHTML = "";
            new NewGameFormView().render(parent);
        });
    }
}

export class NewGameFormView{
    render(parent:HTMLElement):void{
        parent.innerHTML= "";
        let newGameFormDiv = document.createElement("div") as HTMLElement;
        newGameFormDiv.setAttribute("id", "newGameForm");
        
        let nameDiv = document.createElement("div");
        let nameLabel = document.createElement("label") as HTMLElement;
        nameLabel.innerHTML = "name";
        let nameInput  = document.createElement("input") as HTMLElement;
        nameInput.setAttribute("type", "text");
        nameInput.setAttribute("id", "newGameId");  

        nameDiv.appendChild(nameLabel);
        nameDiv.appendChild(nameInput);
        
        let descriptionDiv = document.createElement("div");
        let descriptionLabel = document.createElement("label") as HTMLElement;
        descriptionLabel.innerHTML = "description";
        let descriptionInput  = document.createElement("textarea") as HTMLElement;
        
        descriptionInput.setAttribute("type", "text");
        descriptionInput.setAttribute("id", "newGameId");  
        
        descriptionDiv.appendChild(descriptionLabel);
        descriptionDiv.appendChild(descriptionInput);

        newGameFormDiv.appendChild(nameDiv);
        newGameFormDiv.appendChild(descriptionDiv);
        let createGameBtn = document.createElement("button") as HTMLElement;
        createGameBtn.innerHTML = "Create";
        createGameBtn.classList.add("addBtn");
        
        parent.appendChild(newGameFormDiv);
        parent.appendChild(createGameBtn);

        createGameBtn.addEventListener("click", ()=>{
            let name = document.getElementById("newGameId") as HTMLInputElement;
            // name.value = name.value==""?name.value:"defaultGame";
            new NewGameDetailsView(name.value).render(parent);
        })
    }
}

export class NewGameDetailsView{
    constructor(private name:string){
        
    }
    render(parent:HTMLElement):void{
        parent.innerHTML = "";
        let gameName = document.createElement("h3");
        gameName.innerHTML = this.name;

        let newGameDetailsDiv = document.createElement("div");
        let presetSpritesBtn = document.createElement("button");
        presetSpritesBtn.classList.add("addBtn");
        presetSpritesBtn.setAttribute("id", "presetSprites");
        presetSpritesBtn.innerHTML = "Preset Sprites";

        let addBackgroundPicBtn = document.createElement("button");
        addBackgroundPicBtn.classList.add("addBtn");
        addBackgroundPicBtn.setAttribute("id", "addBackgroundPicBtn");
        addBackgroundPicBtn.innerHTML = "Add Background Picture";

        let addSelectedSpriteBtn = document.createElement("button");
        addSelectedSpriteBtn.classList.add("addBtn");
        addSelectedSpriteBtn.setAttribute("id", "addSelectedSpriteBtn");
        addSelectedSpriteBtn.innerHTML = "Add Selected Sprite";

        let spritePreviewDiv = document.createElement("div");
            let spritePreviewHeader = document.createElement("h4");
            spritePreviewHeader.innerHTML = "Sprite Preview";
            let spritePreviewCanvas = document.createElement("canvas");
            spritePreviewCanvas.setAttribute("id", "spritePreview");

        spritePreviewDiv.appendChild(spritePreviewHeader);
        spritePreviewDiv.appendChild(spritePreviewCanvas);

        let spritePreviewDetailsDiv = document.createElement("div");
            let spritePreviewDetailsHeader = document.createElement("h4");
            spritePreviewDetailsHeader.innerHTML = "Sprite Details";
            spritePreviewDetailsDiv.appendChild(spritePreviewDetailsHeader);
            
            let spriteDetailsList = document.createElement("div");
            spriteDetailsList.setAttribute("id", "spriteDetails");
            spriteDetailsList.appendChild(spritePreviewDetailsHeader);
            spritePreviewDetailsDiv.appendChild(spriteDetailsList);

        newGameDetailsDiv.appendChild(presetSpritesBtn);
        newGameDetailsDiv.appendChild(addBackgroundPicBtn);
        newGameDetailsDiv.appendChild(presetSpritesBtn);
        newGameDetailsDiv.appendChild(spritePreviewDiv);
        newGameDetailsDiv.appendChild(spritePreviewDetailsDiv);
        newGameDetailsDiv.appendChild(addSelectedSpriteBtn);

        parent.appendChild(gameName);
        parent.appendChild(newGameDetailsDiv);

        let startGameBtnDiv = document.createElement("div") as HTMLElement;
        let startGameBtn = document.createElement("button") as HTMLElement;
        startGameBtn.setAttribute("id", "startGameBtn");
        startGameBtn.innerHTML = "Start Game";
        startGameBtn.classList.add("addBtn");
        startGameBtnDiv.appendChild(startGameBtn)

        parent.appendChild(startGameBtnDiv);

        let fullGamePreviewDiv = document.createElement("div");
        let fullGameCanvas = document.createElement("canvas");
        fullGameCanvas.setAttribute("id", "preview");
        fullGameCanvas.width = 400;
        fullGameCanvas.height = 500;
        fullGameCanvas.style.backgroundColor = "aquamarine";
        fullGamePreviewDiv.appendChild(fullGameCanvas);
        
        parent.appendChild(fullGamePreviewDiv);

        presetSpritesBtn.addEventListener("click", ()=>{

        });
    }
}

