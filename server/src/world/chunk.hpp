#pragma once

#include <array>
#include <vector>

#include "constants.hpp"
#include "voxel.hpp"
#include "position.hpp"
#include "core/entities.hpp"


namespace World
{

struct RLEVoxel
{
  VoxelType type;
  uint16_t count;
};

using VoxelArray = std::array<VoxelType, CHUNK_VOLUME>;
using CompressedVoxelArray = std::vector<RLEVoxel>;

struct Chunk
{
public:
  void add_entity(Entities::Entity entity);
  void remove_entity(Entities::Entity entity);
  void set_voxel(VoxelType type, ChunkPosition position);

  ChunkPosition get_position() const { return this->position; }

public:
  ChunkPosition position;
  ChunkMap<ChunkPosition, Entities::Entity> entities;
  VoxelArray voxels;
};

CompressedVoxelArray compess_voxel_data(const VoxelArray& data);
VoxelArray decompress_voxel_data(const CompressedVoxelArray& data);

}