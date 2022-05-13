#include "server.hpp"

#include <thread>
#include <string_view>
#include <string>
#include <assert.h>
#include <iostream>

#include "message.hpp"
#include "game.hpp"

namespace Server
{

static int PORT = 8080;

static uWS::Loop* loop;
static uWS::SSLApp* app;

static std::thread server_thread;


static void client_connect(Server::WebSocket* socket)
{
  std::cout << "Connected" << std::endl;
}

static void client_disconnect(Server::WebSocket* socket)
{
  std::cout << "Disconnected" << std::endl;
}

static void create_app()
{
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
    .message = [](WebSocket* socket, std::string_view message, uWS::OpCode) {
      Game::on_client_message(socket, message);
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
}

void run()
{
  server_thread = std::thread{ create_app };
}

void cleanup()
{
  delete app;
  std::cout << "Server Shut Down" << std::endl;
}

/**
 * Sends a message to a client
 */
void send(WebSocket* socket, ServerMessage& message)
{
  loop->defer([socket, message = std::move(message)]() {
    socket->send(std::string_view{ message.data(), message.size() });
  });
}

/**
 * Broadcasts a message to all connected clients
 */ 
void broadcast(ServerMessage& message)
{
  loop->defer([message = std::move(message)]() {
    app->publish(std::string_view{ "broadcast" }, std::string_view{ message.data() }, uWS::OpCode::BINARY);
  });
}

}