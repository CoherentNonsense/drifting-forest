#include "game_tic.hpp"

#include <stdint.h>

namespace Events::Game
{

void tic(World::World& world)
{
  Systems::World::break_voxel(world);
  Systems::World::place_voxel(world);
  Systems::Movement::move_creatures(world);
  Systems::Movement::collide_creatures(world);
  Systems::FOV::calculate(world);

  Systems::Network::send_player_packets(world);

  /* Precalculate */
  Systems::OctTree::calculate(world);
  Systems::AI::monsters(world);
  Systems::AI::npcs(world);
}

void random_tic(World::World& world)
{}

void program_tic(World::World& world)
{}

}