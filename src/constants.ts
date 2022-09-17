import { ImageSprite } from "./model/image_sprite.js";
import { SoundSprite } from "./model/sound_sprites.js";
import { Sprite } from "./model/sprite.js";
import { TextSprite } from "./model/text_sprites.js";

export const presetSprites:Array<Sprite> = [new ImageSprite(),
     new SoundSprite(),
     new TextSprite("Content")];