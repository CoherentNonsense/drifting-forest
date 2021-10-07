#pragma once

#include "entity_manager.hpp"
#include "component_manager.hpp"
#include <memory>


namespace ECS
{

using Entity = uint32_t;
const Entity MAX_ENTITIES = 10000;

using Component = uint8_t;
const Component MAX_COMPONENTS = 32;

using Signature = std::bitset<MAX_COMPONENTS>;

class Manager
{
public:
  Manager();
  ~Manager();

  Entity create_entity(Signature signature);
  void destroy_entity(Entity entity);

private:
  std::unique_ptr<EntityManager> entity_manager;
  std::unique_ptr<ComponentManager> component_manager;
};

}