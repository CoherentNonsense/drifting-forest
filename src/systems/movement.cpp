#include "movement.hpp"

namespace Systems::Movement
{

void move_creatures(Chunk* chunk, const ComponentView<Position, Input>& view)
{
  for (auto entity : view)
  {
    WorldPosition next_position = apply_position(entity->position, entity->input);
    
    if (chunk->has_voxel(next_position))
    {
      continue;
    }

    entity->position = next_position;
  }
}

}