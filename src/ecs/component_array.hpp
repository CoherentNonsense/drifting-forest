#pragma once

#include "types.hpp"
#include "ecs.hpp"
#include <vector>
#include <unordered_map>

namespace ECS
{

class ComponentArray
{
public:
  ComponentArray(size_t component_size);
  ~ComponentArray();

  void add(Entity entity);
  void remove(Entity entity);
  void* get(Entity entity);
  Entity get_entity(size_t index);
  bool has(Entity entity);
  size_t size() const;

private:
  std::unordered_map<Entity, size_t> sparse;
  std::vector<Entity> packed;
  size_t component_size;
  size_t data_capacity{ 32 };
  void* data;
};

}