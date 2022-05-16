#include "game.hpp"

#include <time.h>
#include <iostream>
#include <mutex>
#include <memory>

#include "systems/game_tick.hpp"
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
  Network::run();
}

void run()
{
  timespec ts;
  uint16_t number_to_send;
  while (running)
  {
    std::cin >> number_to_send;
    // Server::ServerHeader header{ Server::ServerMessageType::Test, number_to_send };
    // Server::ServerMessage message{ header };
    // Server::broadcast(message);

    // timespec_get(&ts, TIME_UTC);
    // int64_t millis = ts.tv_sec * 1000 + ts.tv_nsec * 0.000001;

    // if (millis > last_tic)
    // {
    //   input_mutex.lock();
    //   Systems::game_tick();
    //   input_mutex.unlock();

    //   last_tic = millis + TIME_STEP;
    // }
  }
}

void cleanup()
{
  Network::cleanup();
}

static void player_join(Network::WebSocket* socket)
{
  socket->getUserData()->client_id = 1;
}

static void player_leave(uint32_t entity_id)
{

}

// Called by the server
void on_client_message(Network::WebSocket* socket, std::string_view data)
{
  input_mutex.lock();

  Network::ServerMessage message{data};
  std::cout << message.read<uint16_t>() << std::endl;
  std::cout << message.read<uint16_t>() << std::endl;

  input_mutex.unlock();
}

}