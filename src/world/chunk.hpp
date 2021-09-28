#pragma once

#include "world_consts.hpp"
#include "voxel.hpp"
#include <vector>

namespace World
{

class Chunk
{
public:
  Chunk(ChunkPosition position);
  ~Chunk();
  void set_voxel(VoxelType type, ChunkPosition position);

private:
  CompressedChunk* compress_chunk(const Chunk& chunk);
  Chunk* decompress_chunk(const CompressedChunk& chunk);
  void set_voxel(VoxelType type, ChunkPosition position);

private:
  ChunkPosition position;
  Voxel voxels[CHUNK_VOLUME];
};




}