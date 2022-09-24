export interface Control{
    description:string;
    isTriggered():boolean;
    
}
export class BaseControl implements Control{
    description:string = "";
    private triggered:boolean = false;
    isTriggered(): boolean {
        return this.triggered;
    }
    setTriggered(triggered:boolean):void{
        this.triggered = triggered;
    }
    
}
