#pragma once

#include "ecs.hpp"
#include <unordered_map>
#include <assert.h>

namespace ECS
{

template<typename T>
class ComponentArray
{
public:
  void add_component(Entity entity, T component)
  {
    size_t index = component_count;
    components[index] = component;
    entity_to_index_map[entity] = index;
    index_to_entity_map[index] = entity;

    ++component_count;
  }

  void remove_component(Entity entity)
  {
    size_t removed_index = entity_to_index_map[entity];
    size_t last_index = component_count - 1;
    components[removed_index] = components[last_index];

    Entity last_entity = index_to_entity_map[last_index];
    entity_to_index_map[last_entity] = removed_index;
    index_to_entity_map[removed_index] = last_entity;

    entity_to_index_map.erase(entity);
    index_to_entity_map.erase(last_index);

    --component_count;
  }

private:
  std::array<T, MAX_ENTITIES> components;
  std::unordered_map<Entity, size_t> entity_to_index_map;
  std::unordered_map<size_t, Entity> index_to_entity_map;
  size_t component_count;
};

}