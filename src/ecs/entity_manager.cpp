#include "entity_manager.hpp"
#include <assert.h>

namespace ECS
{

EntityManager::EntityManager()
{
  for (uint32_t i = 0; i < MAX_ENTITIES; ++i)
  {
    available_entities.push(i);
  }
}

EntityManager::~EntityManager()
{}

Entity EntityManager::create_entity(Signature signature)
{
  if (entity_count >= MAX_ENTITIES)
    return;

  Entity entity = available_entities.front();
  available_entities.pop();
  ++entity_count;

  return entity;
}

void EntityManager::destroy_entity(Entity entity)
{
  assert(entity < MAX_ENTITIES && "Entity out of range");

  signatures[entity].reset();
  available_entities.push(entity);
  --entity_count;
}

}