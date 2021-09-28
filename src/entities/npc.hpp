#pragma once
// NPC (non-player creature)

#include "entities/creature.hpp"
#include "components/brain.hpp"

namespace Entities::Player
{

class NPC : public Creature
{
  Components::Brain brain;
};

}