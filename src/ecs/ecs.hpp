#pragma once

#include "types.hpp"
#include "component_array.hpp"
#include "view.hpp"
#include <vector>
#include <assert.h>

namespace ECS
{

class Manager
{
public:
  Manager();
  ~Manager();

  Entity create_entity();
  Entity get_entity(EntityIndex index);
  void destroy_entity(Entity entity);

  template<typename C>
  void add_component(Entity entity)
  {
    ComponentId id = get_component_id<C>();
    assert(id < components.size() && "Cannot add component C before 'use_component<C>()'.");

    components[id]->add(entity);
  }

  template<typename C>
  C* get_component(Entity entity)
  {
    ComponentId id = get_component_id<C>();
    assert(id < components.size() && "Cannot get component C before 'use_component<C>()'.");

    C* component = static_cast<C*>(components.get(entity));
    return component;
  }

  template<typename C>
  void use_component()
  {
    ComponentId id = get_component_id<C>();
    assert(id >= components.size() && "Cannot use u'use_component<C>()' twice.");

    components.resize(id + 1, nullptr);
    components[id] = new ComponentArray(sizeof(C));
  }

  template<typename C>
  bool has_component(Entity entity)
  {
    ComponentId id = get_component_id<C>();
    assert(id < components.size() && "Cannot check for component C before 'use_component<C>()'.");

    return components[id].has(entity);
  }

  template<typename... Cs>
  bool has_components(Entity entity)
  {
    ComponentId ids[] = { get_component_id<Cs>... };
    bool has = true;
    for (unsigned int i = 0; i < sizeof...(Cs); ++i)
    {
      has = has && components[ids[i]].has(entity);
    }

    return has;
  }
  
  template<typename C>
  ComponentArray get_components()
  {
    ComponentId id = get_component_id<C>();
    assert(id < components.size() && "Cannot get component array C before 'use_component<C>()'.");

    return components[id];
  }


private:
  std::vector<Entity> entities;
  std::vector<EntityIndex> available_entities;
  std::vector<ComponentArray> components;
};

}