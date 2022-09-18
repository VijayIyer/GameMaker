import { Sprite } from "./sprite";

export class SoundSprite implements Sprite{
    name:string ="SoundSprite";
    settableProperties: Map<string, any> = new Map<string, any>();
    constructor(audioSrc:string = ""){
        this.settableProperties.set("audioSrc", audioSrc);
    }
    draw(canvas:HTMLCanvasElement):void{

    }
    setAudioSrc(src:string):void{
        this.settableProperties.set("audioSrc", src);
    }
    update():void{

    }
    getPropertyNames(): string[] {
        return [];
    }
}