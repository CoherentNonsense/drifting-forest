#pragma once

#include <string>

#include "server.hpp"

namespace Components
{

struct PlayerConnection
{
  Server::WebSocket* socket;
  std::string data;
};

}