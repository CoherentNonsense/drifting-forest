#pragma once

#include "ecs/ecs.hpp"
#include "chunk.hpp"
#include "world_generator.hpp"
#include <glm/vec3.hpp>
#include <stdint.h>
#include <unordered_map>
#include <memory>
#include <vector>

namespace World
{

using WorldPosition = glm::vec<3, int32_t>;
using ChunkPosition = glm::vec<3, int32_t>;

const uint16_t CHUNK_SIZE = 16;
const uint16_t CHUNK_AREA = CHUNK_SIZE * CHUNK_SIZE;
const uint16_t CHUNK_VOLUME = CHUNK_AREA * CHUNK_SIZE;

const uint16_t WORLD_HEIGHT = 8 * CHUNK_SIZE;

ChunkPosition world_to_chunk_position(WorldPosition world_position);
WorldPosition chunk_to_world_position(ChunkPosition chunk_position);


class World
{
public:
  World();
  ~World();

  void load_chunk(ChunkPosition chunk_position);
  void unload_chunk(ChunkPosition chunk_position);
  Chunk* get_chunk(ChunkPosition chunk_position) const;

private:
  std::unique_ptr<ECS::Manager> ecs;
  std::unique_ptr<WorldGenerator> world_generator;
  std::unordered_map<ChunkPosition, Chunk*, ChunkPositionHash> chunks;
  std::vector<Chunk*> loaded_chunks;
  std::vector<Chunk*> chunk_pool;
};

}