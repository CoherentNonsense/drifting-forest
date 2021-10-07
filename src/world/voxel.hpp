#pragma once

#include <stdint.h>

namespace World
{

enum VoxelType : uint16_t
{
  Air,
  Dirt
};

struct Voxel
{
  VoxelType type;
  uint16_t data;
};

}