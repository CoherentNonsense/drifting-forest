#pragma once

#include <stdint.h>

namespace Entities
{

using Entity = uint64_t;
using EntityIndex = uint32_t;
using EntityVersion = uint32_t;

using ComponentId = uint32_t;

template<typename S>
ComponentId get_component_id()
{
  static ComponentId current_id = current_id++;
  return current_id;
}

}