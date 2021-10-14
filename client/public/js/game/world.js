import { ServerPacketIds } from "../network/packet.js";
import Chunk from "./chunk.js";
var World;
(function (World) {
    const chunks = [];
    const chunk_pool = [];
    function load_chunk(server_data) {
        let chunk = chunk_pool.pop();
        if (chunk === undefined) {
            chunk = new Chunk();
        }
    }
    function unload_chunk(chunk_data) {
    }
    function update_chunk(server_data) {
    }
    function update_entities(server_data) {
    }
    function apply_server_data(server_packet) {
        switch (server_packet.id) {
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
    World.apply_server_data = apply_server_data;
})(World || (World = {}));
export default World;
