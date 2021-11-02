import { delta_time } from "../client.js";
import { Vector3, Vector2 } from "../game/math.js";

class Camera
{
  public position : Vector3;
  public scale : number;

  constructor()
  {
    this.position = { x: 0, y: 0, z: 0 };
    this.scale = 10;
  }

  pan(dir : Vector2 | Vector3)
  {
    this.position.x += dir.x * delta_time;
    this.position.y += dir.y * delta_time;
  }

  dolly(dir : number)
  {
    this.position.z += dir * delta_time;
  }

  zoom(scale : number)
  {
    this.scale += this.scale * scale * delta_time;
  }
}

export default Camera;