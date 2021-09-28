#pragma once

#include <uWebSockets/App.h>
#include <stdint.h>

namespace Server
{

struct PerSocketData
{
	uint32_t client_id;
	// rate limiting
	// bans
	// etc.
};

using WebSocket = uWS::WebSocket<true, true, PerSocketData>;

void run();
void send(WebSocket socket);
void broadcast(std::string_view message);
void cleanup();

}