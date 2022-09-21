import { Sprite } from "./sprite";

export class SoundSprite implements Sprite{
    name:string ="Sound";
    private type:string = "Sound";
    settableProperties: Array<[string, string, string]> = [];
    constructor(audioSrc:string = ""){
        this.settableProperties.push(["name", "string", this.name.toString()]);
        this.settableProperties.push(["audioSrc", "string", audioSrc]);
    }
    draw(canvas:HTMLCanvasElement):void{

    }
    setAudioSrc(src:string):void{
        this.settableProperties.forEach(prop=>{
            if(prop[0]=="audioSrc"){
                prop[1] = src;
            }
        });
        
    }
    update():void{

    }
    getConvertedValue(key:string){
        let found = this.settableProperties.find(prop=> prop[0] == key);
        if(found == undefined){
            found = ["", "number", "0"];
        }
        let val:any;
        switch(found[1]){
            case "number":val = parseInt(found[2]);
                        break;
            case "string": val = found[2];
                break;
            case "boolean":val = Boolean(found[2]);
                break;
            default:val = found[2];
                break;
        }
        return val;
    }
    setValue(key:string, val:string): void {
        let indx = this.settableProperties.findIndex(prop=>prop[0] == key);
        this.settableProperties[indx][2] = val;
    }
    getPropertyNames(): string[] {
        let arr:Array<string> = []
        this.settableProperties.forEach(prop=>arr.push(prop[0]));
        return arr;
    }
}