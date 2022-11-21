#pragma once

#include <array>
#include <glm/vec2.hpp>
#include <stdint.h>
#include <vector>

namespace ECS
{

typedef int32_t entity_id;
typedef int32_t component_mask;

const int MAX_ENTITIES = 5000;

struct Transform {
  glm::ivec2 position;
  int8_t facing;
};

struct PlayerNetwork {
  int32_t socket_id;
  int32_t move_command;
  int32_t attack_command;
};

class World {
public:
  World();
  ~World();
  
  entity_id add_entity();
  void remove_entity(entity_id id);
  void has_components(component_mask mask);
  
private:
  std::array<component_mask, MAX_ENTITIES> entity_components;

  std::array<PlayerNetwork, MAX_ENTITIES> player_netwok_array;
  std::array<Transform, MAX_ENTITIES> transform_array;
};



}