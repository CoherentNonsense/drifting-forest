#pragma once

#include "ecs.hpp"
#include <array>
#include <queue>

namespace ECS
{

class EntityManager
{
public:
  EntityManager();
  ~EntityManager();

  Entity create_entity(Signature signature);
  void destroy_entity(Entity entity);
  
private:
  std::queue<Entity> available_entities;
  std::array<Signature, MAX_ENTITIES> signatures;
  Entity entity_count;
};

}