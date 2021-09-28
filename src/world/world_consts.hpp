#pragma once

#include <stdint.h>
#include <glm/detail/type_vec3.hpp>


namespace World
{

using WorldPosition = glm::vec<3, int32_t>;
using ChunkPosition = glm::vec<3, int32_t>;
using CompressedChunk = std::vector<std::pair<VoxelType, uint16_t>>;

// Size of the world in chunks
const uint16_t WORLD_SIZE = 1000;
// Height of the world in chunks
const uint16_t WORLD_HEIGHT = 8;

const uint16_t CHUNK_SIZE = 32;
const uint16_t CHUNK_AREA = CHUNK_SIZE * CHUNK_SIZE;
const uint16_t CHUNK_VOLUME = CHUNK_AREA * CHUNK_SIZE;

}