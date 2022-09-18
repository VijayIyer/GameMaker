import { Circle } from "./model/circle_sprite.js";
import { ImageSprite } from "./model/image_sprite.js";
import { Rectangle } from "./model/rectangle_sprite.js";
import { SoundSprite } from "./model/sound_sprites.js";
import { Sprite } from "./model/sprite.js";
import { ClockSprite, TextSprite } from "./model/text_sprites.js";

export const presetSprites:Array<Sprite> = [new Circle(20, 30, "red", 5),
     new Rectangle(0, 0, "blue", 10, 10), 
     new SoundSprite(),
     new TextSprite("Content", 10, 10, 10, "20px Arial"), new ClockSprite()];