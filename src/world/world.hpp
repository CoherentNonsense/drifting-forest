#pragma once

#include <stdint.h>
#include <unordered_map>
#include <memory>
#include <vector>

#include "position.hpp"
#include "chunk.hpp"
#include "entities/entities.hpp"

namespace World
{

ChunkPosition world_to_chunk_position(WorldPosition world_position);
WorldPosition chunk_to_world_position(ChunkPosition chunk_position);

class World
{
public:
  void load_chunk(ChunkPosition chunk_position);
  void unload_chunk(ChunkPosition chunk_position);
  Chunk* get_chunk(ChunkPosition chunk_position) const;
  Chunk* get_chunk(WorldPosition world_position) const;

public:
  std::unique_ptr<Entities::Manager> entities;
  std::unique_ptr<WorldGenerator> world_generator;
  ChunkMap<ChunkPosition, Chunk*> chunks;
  std::vector<Chunk*> chunk_pool;
};

}