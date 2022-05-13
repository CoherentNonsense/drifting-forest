#include "world.hpp"

#include <array>
#include <map>
#include <assert.h>

namespace World
{

ChunkPosition world_to_chunk_position(WorldPosition world_position)
{
  return ChunkPosition{world_position.x / CHUNK_SIZE, world_position.y / CHUNK_SIZE, world_position.z / CHUNK_SIZE};
}

WorldPosition chunk_to_world_position(ChunkPosition chunk_position)
{
  return WorldPosition{chunk_position.x * CHUNK_SIZE, chunk_position.y * CHUNK_SIZE, chunk_position.z * CHUNK_SIZE};
}


World::World()
{}

World::~World()
{
  // for (auto kv : chunks)
  // {
  //   delete kv.second;
  // }

  // for (auto chunk : chunk_pool)
  // {
  //   delete chunk;
  // }
}

void World::load_chunk(ChunkPosition chunk_position)
{
  // Chunk* chunk = nullptr;
  // if (chunk_pool.size() == 0)
  // {
  //   chunk = new Chunk(chunk_position);
  // }
  // else
  // {
  //   chunk = chunk_pool.back();
  //   chunk_pool.pop_back();
  // }

  // // world_generator->generate_chunk(*chunk);

  // chunks[chunk_position] = chunk;
}

void World::unload_chunk(ChunkPosition chunk_position)
{
  // assert(chunks.find(chunk_position) != chunks.end() && "Unloading unloaded chunk");

  // Chunk* chunk = chunks.find(chunk_position)->second;

  // chunk_pool.push_back(chunk);
  // chunks.erase(chunk_position);
}

// Chunk* World::get_chunk(ChunkPosition chunk_position) const
// {
//   // assert(chunks.find(chunk_position) != chunks.end() && "Requesting unloaded chunk");

//   // return chunks.find(chunk_position)->second;
// }


}