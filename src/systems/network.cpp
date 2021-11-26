#include "network.hpp"

#include "server/server.hpp"
#include "entities/view.hpp"
#include "components/player_connection.hpp"
#include "world/world.hpp"
#include "world/chunk.hpp"

namespace System::Network
{

void send_player_packets(World::World& world)
{
  for (auto [chunk_position, chunk] : world.chunks)
  {
    for (auto [entity_position, entity] : chunk->entities)
    {

    }
  }
}

}