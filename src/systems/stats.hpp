#pragma once

#include "ecs/ecs.hpp"
#include "components/stats.hpp"

namespace Systems
{

void tic_hunger(ECS::View<Components::Stats> view)
{
  for (ECS::Entity entity : view)
  {
    // epic
  }
}

}