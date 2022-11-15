#include "server.hpp"

#include <optional>
#include <string_view>
#include <string>
#include <assert.h>
#include <iostream>

#include "game.hpp"

namespace Network
{

static int PORT = 8080;

static uWS::Loop* loop;
static uWS::SSLApp* app;
static Data network_data{};

static int32_t id_incrementor = 0;

std::optional<ClientPacket> poll() {
  if (network_data.client_packets.empty()) {
    return std::nullopt;
  }

  network_data.mutex.lock();

  ClientPacket packet = network_data.client_packets.top();
  network_data.client_packets.pop();
  
  network_data.mutex.unlock();
  
  return std::optional<ClientPacket>{packet};
}

static void client_connect(Network::WebSocket* socket) {
  socket->getUserData()->client_id = id_incrementor++;
  std::cout << "Connected (id = " << socket->getUserData()->client_id << ")" << std::endl;
}

static void client_disconnect(Network::WebSocket* socket) {
  std::cout << "Disconnected" << std::endl;
}

void start_server() {
  network_data.network_thread = std::thread{ []() {
    app = new uWS::SSLApp({
      .key_file_name = "../misc/key.pem",
      .cert_file_name = "../misc/cert.pem",
      .passphrase = "1234"
    });

    // Routes
    app->ws<PerSocketData>("/*", {
      /* Settings */
      .compression = uWS::DISABLED,
      .maxPayloadLength = 16 * 1024 * 1024,
      .idleTimeout = 32,
      .maxBackpressure = 1 * 1024 * 1024,
      .closeOnBackpressureLimit = false,
      .resetIdleTimeoutOnSend = false,
      .sendPingsAutomatically = true,
      /* Handlers */
      .upgrade = nullptr,
      .open = [](WebSocket* socket) {
        socket->subscribe("broadcast");
        client_connect(socket);
      },
      .message = [](WebSocket* socket, std::string_view message, uWS::OpCode _) {
        network_data.mutex.lock();
        network_data.client_packets.emplace(message);
        network_data.mutex.unlock();
      },
      .drain = [](WebSocket */*ws*/) {},
      .close = [](WebSocket* socket, int /*code*/, std::string_view /*message*/) {
        client_disconnect(socket);
      }
    });

    loop = uWS::Loop::get();
    
    app->listen(PORT, [](auto *listen_socket) {
      if (listen_socket)
          std::cout << "Listening on port " << PORT << "...\n";
    });
    app->run();
  }};
}

void cleanup()
{
  delete app;
  std::cout << "Server Shut Down" << std::endl;
}

/**
 * Sends a message to a client
 */
void send(WebSocket* socket, ServerPacket& message)
{
  loop->defer([socket, message = std::move(message)]() {
    socket->send(std::string_view{ message.data(), message.size() }, uWS::OpCode::BINARY);
  });
}

/**
 * Broadcasts a message to all connected clients
 */ 
void broadcast(ServerPacket& message)
{
  loop->defer([message = std::move(message)]() {
    app->publish("broadcast", std::string_view{ message.data(), message.size() }, uWS::OpCode::BINARY);
  });
}

}