#pragma once

#include "network/server.hpp"
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

void on_client_message(Server::WebSocket* socket, std::string_view message);

}