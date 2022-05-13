import { deltaTime } from "../client.js";
import { vec2, mat4 } from "gl-matrix";
import Context from "./context.js";

class Camera
{
  public position : vec2;

  private projection : mat4;
  private view : mat4;
  private scale : number;

  constructor()
  {
    this.position = vec2.create();
    this.projection = mat4.create();
    this.view = mat4.create();
    this.scale = 1;
  }

  moveTo(position : vec2) {
    this.position = position;
  }

  setScale(scaleFactor : number) {
    this.scale = scaleFactor;
  }

  getView() : mat4 {
    mat4.lookAt(this.view, [this.position[0], this.position[1], 1], [this.position[0], this.position[1], -1], [0, 1, 0]);
    return this.view;
  }

  getProjection(context : Context) : mat4 {
    const { canvas } = context;
    const halfWidth = canvas.width / 2 / this.scale;
    const halfHeight = canvas.height / 2 / this.scale;
  
    mat4.ortho(this.projection, -halfWidth, halfWidth, -halfHeight, halfHeight, 0.1, 100);
    return this.projection;
  }
}

export default Camera;