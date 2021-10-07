#pragma once

#include "server.hpp"
#include <stdint.h>

namespace Game
{

enum class MessageType : uint8_t
{
  Join,
  Leave,
  Input
};

void init();
void run();
void cleanup();

uint32_t player_join();
void player_leave(uint32_t entity_id);

void client_message(Server::WebSocket* socket, std::string_view message);

}