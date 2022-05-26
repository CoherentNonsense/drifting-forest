#pragma once

#include <stack>

#include "network/packet.hpp"

namespace Systems
{

using Packet = Network::ClientPacket;
using PacketType = Network::ClientPacketType;

void on_move(int player_id, Packet packet)
{
  // uint8_t data = packet.read<uint8_t>();
  // int dir_x = 0;
  // int dir_y = 0;
  // if (data & 0x1)
  // {
  //    dir_x += 1;
  // }
  // if (data & 0x2)
  // ...
  // 
  // Velocity& velocity = Core::get_component<Velocity>(player_id);
  // velocity.x = dir_x;
  // velocity.y = dir_y;
}

void on_tile_place(int player_id, Packet packet)
{
  World::tile_t tile_id = packet.read<uint16_t>();
  int x = packet.read<int>();
  int y = packet.read<int>();
  Position& player_position = Core::get_component<Position>(player_id);
  if (|x - player_position.x| < 2)
  {
    Position block_position{ x, y, player_position}
    World::place_tile(tile_id, );
  }
  World::place_block(tile_id)
}

void handle_player_input(std::stack<Packet> client_packets)
{
  while (!client_packets.empty())
  {
    Packet packet = client_packets.top();
    client_packets.pop();

    switch (packet.type())
    {
    case PacketType::Move:
      on_move(1, packet);
      break;
    
    default:
      break;
    }
      
  }
}

}