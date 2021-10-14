import Sprite from "../graphics/spritesheet.js";
import Renderer from "../graphics/renderer.js";

const CHUNK_SIZE = 32;

const spritesheet = new Sprite.Spritesheet(512, 8);

class Chunk
{
  public position : { x : number, y : number };
  public entities : any[];
  public voxels : any[];

  constructor()
  {
    this.position = { x: 0, y: 0 };
    this.entities = [];
    this.voxels = [];
  }

  // Updates any changes to the contents of a chunk
  update(data : any) : void
  {
    // data.delta_entities.forEach((delta_entitiy : any) => {
    //   this.entities.get(delta_entitiy.id).update(delta_entitiy.delta);
    // });

    // data.delta_voxels.forEach((delta_voxel : any) => {
    //   this.voxels.get(delta_voxel.id).update(delta_voxel.delta);
    // });
  }

  draw() : void
  {
    for (let x = 0; x < CHUNK_SIZE; ++x)
    {
      for (let y = 0; y < CHUNK_SIZE; ++y)
      {
        Renderer.draw_sprite(this.position.x + x * 8, this.position.y + y * 8, spritesheet.get_sprite(0, 0));
      }
    }
  }
}

export default Chunk;