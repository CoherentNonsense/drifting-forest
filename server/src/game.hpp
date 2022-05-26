#pragma once

#include "network/server.hpp"
#include <stdint.h>

namespace Game
{

void init();
void run();
void cleanup();

// Called by the network thread
void on_client_message(Network::WebSocket* socket, std::string_view message);

}