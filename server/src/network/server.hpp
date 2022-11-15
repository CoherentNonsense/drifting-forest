#pragma once

#include <mutex>
#include <stack>
#include <thread>
#include <uWebSockets/App.h>
#include <stdint.h>

#include "packet.hpp"

namespace Network
{

struct Data {
	std::thread network_thread;
	std::mutex mutex;
	std::stack<ClientPacket> client_packets;
	
};

struct PerSocketData {
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
std::optional<ClientPacket> poll();
}