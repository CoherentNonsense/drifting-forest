import { ServerPacket, ServerPacketIds } from "../network/packet.js";
import Chunk from "./chunk.js";

namespace World
{

const chunks : Map<string, Chunk> = new Map();
const chunk_pool : Chunk[] = new Array();


function load_chunk(server_data : any) : void
{
  let chunk = chunk_pool.pop();
  if (chunk === undefined)
  {
    chunk = new Chunk();
  }

  // Set chunk data

  chunks.set(chunk.get_key(), chunk);
}

export function unload_chunk(chunk : Chunk) : void
{
  const deleted = chunks.delete(chunk.get_key());

  if (deleted)
  {
    chunk_pool.push(chunk); 
  }
}


function update_chunk(server_data : any) : void
{

}

function update_entities(server_data : any) : void
{

}

export function apply_server_data(server_packet : ServerPacket) : void
{
  switch (server_packet.id)
  {
    case ServerPacketIds.LoadChunk:
      load_chunk(server_packet.data);
      break;
    case ServerPacketIds.UpdateChunk:
      update_chunk(server_packet.data);
      break;
    case ServerPacketIds.UpdateEntities:
      update_entities(server_packet.data);
      break;
  }
}

}

export default World;