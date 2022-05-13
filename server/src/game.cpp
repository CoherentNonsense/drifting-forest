#include "game.hpp"

#include "systems/game_tick.hpp"
#include <time.h>
#include <iostream>
#include <mutex>
#include <memory>

#include "network/message.hpp"

namespace Game
{

static const int64_t TPS = 10;
static const int64_t TIME_STEP = 1000 / TPS;

static std::mutex input_mutex{};

static int64_t last_tic = 0;
static bool running = true;
// static std::unique_ptr<World::World> world = std::make_unique<World::World>();

void init()
{
  Server::run();
}

void run()
{
  timespec ts;
  int number_to_send;
  while (running)
  {
    std::cin >> number_to_send;
    Server::ServerHeader header{ Server::ServerMessageType::There, 0 };
    Server::ServerMessage message{ header };
    Server::broadcast(message);

    timespec_get(&ts, TIME_UTC);
    int64_t millis = ts.tv_sec * 1000 + ts.tv_nsec * 0.000001;

    if (millis > last_tic)
    {
      input_mutex.lock();
      Systems::game_tick();
      input_mutex.unlock();

      last_tic = millis + TIME_STEP;
    }
  }
}

void cleanup()
{
  Server::cleanup();
}

static void player_join(Server::WebSocket* socket)
{
  socket->getUserData()->client_id = 1;
}

static void player_leave(uint32_t entity_id)
{

}

// Called by the server
void on_client_message(Server::WebSocket* socket, std::string_view message)
{
  input_mutex.lock();

  MessageType message_type = static_cast<MessageType>(message.data()[0]);
  std::cout << (unsigned)message_type << std::endl;
  switch (message_type)
  {
    case MessageType::Join:
      player_join(socket);
      break;
    case MessageType::Leave:
      player_leave(socket->getUserData()->client_id);
      break;
    case MessageType::Input:
      (socket->getUserData()->client_id, message);
      break;
  }

  input_mutex.unlock();
}

}