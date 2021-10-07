#pragma once

#include "world.hpp"
#include "voxel.hpp"
#include "ecs/ecs.hpp"
#include <unordered_map>

namespace World
{

struct ChunkPositionHash {
  // http://www.beosil.com/download/CollisionDetectionHashing_VMV03.pdf
  size_t operator()(const ChunkPosition& position) const
  {
    return (position.x * 88339) ^ (position.z * 91967) ^ (position.z * 126323);
  }
};

class Chunk
{
public:
  Chunk(ChunkPosition position);
  ~Chunk();

  void add_entity(ECS::Entity entity);
  void remove_entity(ECS::Entity entity);

  void set_voxel(VoxelType type, ChunkPosition position);

private:
  ChunkPosition position;
  std::unordered_map<ChunkPosition, ECS::Entity> entities;
  Voxel voxels[CHUNK_VOLUME];
};




}