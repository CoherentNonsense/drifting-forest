
namespace World {
  
export class Chunk {
  x : Number;
  y : Number;
  private tilemap : Array<Number>;
  
  constructor() {
    this.x = 0;
    this.y = 0;
    this.tilemap = new Array();
  }
}


export class ChunkManager {
  private chunks : Array<Chunk>;
  
  constructor() {
    this.chunks = new Array(9);
  }

  
}

}