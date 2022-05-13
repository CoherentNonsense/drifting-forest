#include "world_generator.hpp"

#include "world.hpp"
#include <simplex/SimplexNoise.hpp>

namespace World
{
static SimplexNoise<double> simplex;


void WorldGenerator::generate_chunk(Chunk& chunk)
{
  for (uint32_t x = 0; x < CHUNK_SIZE; ++x)
  {
    for (uint32_t y = 0; y < CHUNK_SIZE; ++y)
    {
      double noise = simplex.noise2(
        static_cast<double>(x + chunk.get_position().x),
        static_cast<double>(y + chunk.get_position().y));
        
      if (noise > 0.5)
      {
        chunk.set_voxel(VoxelType::Air, ChunkPosition{x, y, 1});
      }
      else
      {
        chunk.set_voxel(VoxelType::Dirt, ChunkPosition{x, y, 1});
      }
    }
  }
}

}