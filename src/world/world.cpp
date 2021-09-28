#include "world.hpp"

#include "chunk.hpp"
#include <array>
#include <map>

namespace World
{

static const uint32_t MAX_ENTITIES = 1000;

static std::map<ChunkPosition, Chunk*> chunks;
static std::map<uint32_t, Chunk*> entity_chunk_map;
static std::array<uint32_t, MAX_ENTITIES> entities;
static uint32_t n_entities;

uint32_t add_player()
{
  static uint32_t current_entities = 0;
  uint32_t new_entity_id = current_entities++;
  entities[n_entities] = new_entity_id;
  ++n_entities;
  return new_entity_id;
}

void remove_player(uint32_t entity_id)
{
  --n_entities;
}

void player_input(uint32_t entity_id, std::string_view message)
{
  Chunk* player_chunk = entity_chunk_map.at(entity_id);
}


}