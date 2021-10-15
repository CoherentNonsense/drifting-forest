#pragma once

#include "ecs.hpp"
#include "system.hpp"
#include <unordered_map>

namespace ECS
{

class SystemManager
{
public:
  SystemManager();
  ~SystemManager();

  template<typename S>
  System register_system(Signature signature)
  {
    System system = get_system<S>();

    assert(signatures.find(system) != mSystems.end() && "Cannot register system more than once.");

    signatures[system] = signature;
    systems[system] = S;
  }

private:
  std::unordered_map<System, > systems;
};

}