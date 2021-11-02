#include "ecs.hpp"

#include "entity.hpp"

namespace ECS
{

Manager::Manager()
{}

Manager::~Manager()
{}

Entity Manager::create_entity()
{
  if (available_entities.empty())
  {
    entities.push_back(make_entity_id(entities.size(), 0));
    return entities.back();
  }

  EntityIndex created_index = available_entities.back();
  EntityVersion created_version = get_entity_version(entities[created_index]);
  available_entities.pop_back();
  entities[created_index] = make_entity_id(created_index, created_version);
  return entities[created_index];
}

void Manager::destroy_entity(Entity entity)
{
  Entity destroyed_entity = make_entity_id(-1, get_entity_version(entity) + 1);
  EntityIndex destroyed_index = get_entity_index(entity);
  entities[destroyed_index] = destroyed_entity;
  available_entities.push_back(destroyed_index);
}

Entity Manager::get_entity(EntityIndex index)
{
  return entities[index];
}

}