#pragma once

#include <stdint.h>

namespace World
{

enum BlockId : uint16_t
{
  Air,
  Dirt,
  Sand
};

struct Voxel
{
  BlockId id;
  int32_t x;
  int32_t y;
};

struct Chunk
{
  int32_t x;
  int32_t y;
  Voxel* modifications;
};

int32_t world_to_chunk_position(int32_t world_x, int32_t world_y);
int32_t chunk_to_world_position(int32_t chunk_x, int32_t chunk_y);
Chunk* chunk_from_world_position(int32_t world_x, int32_t world_y);
Chunk* chunk_from_chunk_position(int32_t chunk_x, int32_t chunk_y);
void load_chunk(int32_t chunk_x, int32_t chunk_y);
void unload_chunk(int32_t chunk_x, int32_t chunk_y);
void set_voxel(BlockId id, int32_t world_x, int32_t world_y);

}