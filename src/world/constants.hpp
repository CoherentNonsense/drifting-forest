#pragma once

#include <stdint.h>

namespace World
{

const uint16_t CHUNK_SIZE = 16;
const uint16_t CHUNK_AREA = CHUNK_SIZE * CHUNK_SIZE;
const uint16_t CHUNK_VOLUME = CHUNK_AREA * CHUNK_SIZE;

const uint16_t WORLD_HEIGHT = 8 * CHUNK_SIZE;

using VoxelType = uint16_t;

}