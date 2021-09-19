#pragma once

#include <uWebSockets/App.h>
#include <stdint.h>

namespace Server
{

struct PerSocketData {
	// rate limiting
	// bans
	// etc.
};

typedef uWS::WebSocket<true, true, PerSocketData> WebSocket;

void run();
void send(WebSocket socket);
void broadcast(std::string_view message);
void cleanup();

}