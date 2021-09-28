#pragma once
/* Creature
 * A creature is anything entity that takes space on a map such as players and npcs
 */

#include "components/position.hpp"
#include "components/input.hpp"

namespace Entities
{

class Creature
{
  Components::Position position;
  Components::Input input;
};

}