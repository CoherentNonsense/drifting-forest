#pragma once

#include "types.hpp"

namespace Entities
{

class Manager;

template<typename Cs>
struct Iterator
{
  Iterator(Manager* manager, size_t index, ComponentPool min_component_array) 
    : manager(manager),
      index(index),
      min_component_array(min_component_array)
  {}

  Entity operator*() const
  {
    return entity;
  }
  
  bool operator==(const Iterator& other) const
  {
    return entity == other.entity;
  }

  bool operator!=(const Iterator& other) const
  {
    return entity != other.entity;
  }

  Iterator& operator++()
  {
    do
    {
      entity = min_component_array.get_entity(first_index);
      ++index;
    }
    while (first_index < min_component_array.size() && !manager->has_components<Cs>(entity));

    return *this;
  }

public:
  Entity entity;

private:
  size_t index;
  Manager* manager;
  ComponentPool min_component_array;
};


template<typename... Cs>
class View
{
public:
  View(Manager* manager)
    : component_ids{ get_component_id<Cs>()... },
  {
    size_t min_component_size = -1;
    for (unsigned int i = 0; i < sizeof...(Cs); ++i)
    {
      ComponentPool array = manager->get_components(ids[i]);
      size_t size = array.size();
      if (size < min_component_size)
      {
        min_component_size = size;
        min_component_array = array;
      }
    }
  }

  const Iterator begin() const
  {
    size_t first_index = 0;
    bool valid = false;
    while (true)
    {
      Entity entity = min_component_array.get_entity(first_index);

      if (first_index >= min_component_array.size() || manager->has_components<Cs>(entity))
        break;

      ++first_index;
    }

    return Iterator<Cs>(manager, first_index, min_component_array);
  }

  const Iterator end() const
  {
    return Iterator<Cs>(manager, min_component_array.size(), min_component_array);
  }

private:
  EntityIndex index;
  Manager* manager;
  ComponentId component_ids[sizeof...(Cs)];
  ComponentPool min_component_array;
  bool all{ false };
};

}