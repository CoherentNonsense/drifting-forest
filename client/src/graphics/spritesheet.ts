namespace Sprite
{

export class Frame {
  u : number;
  v : number;
  width : number;
  height : number;

  constructor(u : number, v : number, width : number, height : number) {
    this.u = u;
    this.v = v;
    this.width = width;
    this.height = height;
  }
};

export class AnimatedSprite {
  private animations : Array<Frame>;
  private frameCount : number;
  private frameDuration : number;
  private offset : number;
  private timer : number;

  constructor(startFrame : Frame, frameCount : number, frameDuration : number) {
    this.animations = [startFrame];
    this.frameCount = frameCount;
    this.frameDuration = frameDuration;
    this.offset = 0;
    this.timer = 0;
  }

  update(deltaTime : number) {
    this.timer += deltaTime;
    if (this.timer > this.frameDuration) {
      this.timer = 0;
      this.offset = (this.offset + 1) % this.frameCount;
    }
  }

  getFrame() : Frame {
    return new Frame(
      this.animations[0].u + this.offset * this.animations[0].width,
      this.animations[0].v,
      this.animations[0].width,
      this.animations[0].height
    );
  }
}

export class Spritesheet {
  private size : number;
  private frameSize : number;

  constructor(size : number, frame_size : number)
  {
    this.size = size;
    this.frameSize = frame_size;
  }

  getFrame(u : number, v : number, width : number = 1, height : number = 1)
  {
    return new Frame(
      u * this.frameSize,
      v * this.frameSize,
      width * this.frameSize,
      height * this.frameSize,
    );
  }
}

}

export default Sprite;