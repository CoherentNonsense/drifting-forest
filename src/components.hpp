#pragma once

#include "world/world_consts.hpp"
#include <array>

namespace Components
{

template<typename T>
class ComponentList
{
  ComponentList;
  ~ComponentList;

private:
  std::array<T, World::CHUNK_AREA>
};

}