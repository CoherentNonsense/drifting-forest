#include "component_pool.hpp"

namespace Entities
{

ComponentPool::ComponentPool(size_t component_size)
  : component_size(component_size),
    data(malloc(data_capacity * component_size))
{}

ComponentPool::~ComponentPool()
{}

void ComponentPool::add(Entity entity)
{
  if (packed.capacity() > data_capacity)
  {
    data_capacity = packed.capacity();
    realloc(data, data_capacity * component_size);
  }

  size_t index = packed.size();
  sparse[entity] = index;
  packed[index] = entity;
}

void ComponentPool::remove(Entity entity)
{
  size_t removed_index = sparse[entity];
  size_t last_index = packed.size() - 1;
  
  Entity last_entity = packed[last_index];
  sparse[last_entity] = removed_index;
  packed[removed_index] = last_entity;

  sparse.erase(entity);
  packed.pop_back();
}

void* ComponentPool::get(Entity entity)
{
  return data + sparse[entity] * component_size;
}

bool ComponentPool::has(Entity entity)
{
  return sparse.find(entity) != sparse.end();
}

Entity ComponentPool::get_entity(size_t index)
{
  return packed[index];
}

size_t ComponentPool::size() const
{
  return packed.size();
}

}