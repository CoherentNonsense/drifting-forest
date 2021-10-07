#include "ecs.hpp"

namespace ECS
{

Manager::Manager()
{
  entity_manager = std::make_unique<EntityManager>();
  component_manager = std::make_unique<ComponentManager>();
}

Entity Manager::create_entity(Signature signature)
{
  entity_manager->create_entity(signature);
}

void Manager::destroy_entity(Entity entity)
{
  entity_manager->destroy_entity(entity);
}

}