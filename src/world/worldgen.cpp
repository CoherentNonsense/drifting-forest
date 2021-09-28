#include "worldgen.hpp"

#include "world.hpp"
#include <simplex/SimplexNoise.hpp>

namespace World
{

static SimplexNoise<double> simplex;

Chunk* generate(ChunkPosition chunk_position)
{
  Chunk* chunk = load_chunk(chunk_position);


  for (uint32_t x = chunk_position.x; x < chunk_position.x + CHUNK_SIZE; ++x)
  {
      for (uint32_t y = chunk_position.y; y < chunk_position.y + CHUNK_SIZE; ++y)
      {
        double noise = simplex.noise2(static_cast<double>(chunk_position.x), static_cast<double>(chunk_position.y));
        if (noise > 0.5)
        {
          chunk->set_voxel(VoxelType::Air, ChunkPosition{x, y, 1});
        }
        else
        {
          chunk->set_voxel(VoxelType::Dirt, ChunkPosition{x, y, 1});
        }
      }
  }
}

}