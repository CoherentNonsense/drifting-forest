#pragma once

#include <glm/glm.hpp>
#include <unordered_map>


namespace World
{

using WorldPosition = glm::ivec3;
using ChunkPosition = glm::ivec3;

struct ChunkPositionHash {
  // http://www.beosil.com/download/CollisionDetectionHashing_VMV03.pdf
  size_t operator()(const ChunkPosition& position) const
  {
    return (position.x * 88339) ^ (position.z * 91967) ^ (position.z * 126323);
  }
};

template <typename Key, typename Value>
using ChunkMap = std::unordered_map<Key, Value, ChunkPositionHash>;

}