#pragma once

#include <mutex>
#include <stack>
#include <thread>
#include <uWebSockets/App.h>
#include <stdint.h>
#include <utility>

#include "packet.hpp"

namespace Network
{

struct PerSocketData {
	uint32_t client_id;
	// rate limiting
	// bans
	// etc.
};

using WebSocket = uWS::WebSocket<true, true, PerSocketData>;

struct Data {
	std::thread network_thread;
	std::mutex mutex;
	std::stack<std::pair<WebSocket*, ClientPacket>> client_packets;	
};

void start_server();
void send(WebSocket* socket, ServerPacket& message);
void broadcast(ServerPacket& message);
void cleanup();
std::optional<std::pair<WebSocket*, ClientPacket>> poll();
}