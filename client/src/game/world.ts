import { ServerPacket, ServerPacketIds } from "../network/packet.js";
import Chunk from "./chunk.js";

namespace World
{

const chunks : Chunk[] = [];
const chunk_pool : Chunk[] = [];


function load_chunk(server_data : any) : void
{
  let chunk = chunk_pool.pop();
  if (chunk === undefined)
  {
    chunk = new Chunk();
  }

  // chunk.load(server_data);
}

function unload_chunk(chunk_data : any) : void
{
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