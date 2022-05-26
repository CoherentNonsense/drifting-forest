#pragma once

#include <uWebSockets/App.h>
#include <stdint.h>

#include "packet.hpp"

namespace Network
{

struct PerSocketData
{
	uint32_t client_id;
	// rate limiting
	// bans
	// etc.
};

using WebSocket = uWS::WebSocket<true, true, PerSocketData>;

void start_server();
void send(WebSocket* socket, ServerPacket& message);
void broadcast(ServerPacket& message);
void cleanup();

}