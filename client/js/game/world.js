import Chunk from "./chunk.js";

const CHUNK_POOL_SIZE = 24;

const chunks = [];
const chunk_pool = [];


// Initialise chunks
for (let i = 0; i < CHUNK_POOL_SIZE; ++i)
{
  chunk_pool.push(new Chunk());
}

function load_chunk(server_data)
{
  if (chunk_pool.length === 0)
  {
    console.error(`Chunk pool of size ${CHUNK_POOL_SIZE} is too small.`);
    return;
  }


  const chunk = chunk_pool.pop();
  chunk.load(server_data);
}

function unload_chunk(chunk_data)
{

}


function update_chunk(server_data)
{

}

function update_entities(server_data)
{

}

function apply_server_data(server_data)
{
  switch (server_data.id)
  {
    case "load_chunk":
      load_chunk(server_data);
      break;
    case "update_chunk":
      update_chunk(server_data);
      break;
    case "update_entities":
      update_entities(server_data);
      break;
  }
}

const World = Object.freeze({
  apply_server_data
});

export default World;