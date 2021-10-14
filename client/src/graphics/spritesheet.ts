namespace Sprite
{

export type Frame = {
  u : number;
  v : number;
  width : number;
  height : number;
  size : number;
};

export class Spritesheet
{
  private size : number;
  private frame_size : number;

  constructor(size : number, frame_size : number)
  {
    this.size = size;
    this.frame_size = frame_size;
  }

  get_sprite(u : number, v : number, width : number = 1, height : number = 1)
  {
    const frame : Frame = {
      u: u * this.frame_size,
      v: v * this.frame_size,
      width: width * this.frame_size,
      height: height * this.frame_size,
      size: this.size
    };

    return frame;
  }
}

}

export default Sprite;