#pragma once

#include "ecs.hpp"
#include <set>
#include <assert.h>

namespace ECS
{

using SystemId = uint8_t;
const SystemId MAX_SYSTEMS = 256;

static SystemId system_counter;

template<typename S>
SystemId get_system_id()
{
  assert(system_counter < MAX_SYSTEMS && "Cannot exceed 256 systems.");

  static SystemId system_id = system_counter++;

  return system_id;
}

class System
{
public:
  System();
  ~System();

  void run();

public:
  std::set<Entity> entities;
};

}