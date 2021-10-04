import Chunk from "./chunk";

const loaded_chunks = [new Chunk({voxels: [
  
]})];
const cursor = Object.freeze({ x: 0, y: 0 });

function apply_server_data()
{
  // Update chunk data

  // Unload unused chunks
}


const World = Object.freeze({
  apply_server_data
});

export default World;