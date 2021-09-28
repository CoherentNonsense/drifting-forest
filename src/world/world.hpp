#pragma once

#include <stdint.h>
#include <string_view>

namespace World
{

uint32_t add_player();
void remove_player(uint32_t entity_id);
void player_input(uint32_t entity_id, std::string_view message);

Chunk* load_chunk(ChunkPosition chunk_position);
void unload_chunk(ChunkPosition chunk_position);

ChunkPosition world_to_chunk_position(WorldPosition world_position);
WorldPosition chunk_to_world_position(ChunkPosition chunk_position);
Chunk* get_chunk_from_world_position(WorldPosition world_position);
Chunk* get_chunk(ChunkPosition chunk_position);

}