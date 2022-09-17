import { Sprite } from "./sprite";

export class SoundSprite implements Sprite{
    audioSrc:string = "";
    draw(canvas:HTMLCanvasElement):void{

    }
    setAudioSrc(src:string):void{
        this.audioSrc = src;
    }
    update():void{

    }
}