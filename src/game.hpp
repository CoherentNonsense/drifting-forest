#pragma once

#include "server.hpp"
#include <stdint.h>
#include <string_view>

namespace Game
{

void init();
void run();
void cleanup();

void client_connect(Server::WebSocket* socket);
void client_disconnect(Server::WebSocket* socket);
void client_message(Server::WebSocket* socket, std::string_view message);

}