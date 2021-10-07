export default class Spritesheet
{
  constructor(size, sprite_size)
  {
    this.size = size;
    this.sprite_size = sprite_size;
  }

  get_sprite(u, v, width = 1, height = 1)
  {
    return { 
      u: u * this.sprite_size,
      v: v * this.sprite_size,
      width: width * this.sprite_size,
      height: height * this.sprite_size,
      size: this.size
    };
  }
}