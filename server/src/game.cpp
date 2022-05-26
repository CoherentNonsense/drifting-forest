#include "game.hpp"

#include <time.h>
#include <iostream>
#include <mutex>
#include <memory>
#include <stack>
#include <thread>

#include "systems/game_tick.hpp"
#include "systems/player_input.hpp"
#include "network/packet.hpp"

namespace Game
{

static const int64_t TPS = 10;
static const int64_t TIME_STEP = 1000 / TPS;

static std::mutex input_mutex{};

static int64_t last_tic = 0;
static bool running = true;

static std::thread network_thread;

static std::unique_ptr<World::World> world = std::make_unique<World::World>();
static std::stack<Network::ClientPacket> client_messages;

void init()
{
  network_thread = std::thread{ Network::start_server };
}

void run()
{
  timespec ts;
  uint16_t number_to_send;
  while (running)
  {
    std::cin >> number_to_send;

    timespec_get(&ts, TIME_UTC);
    int64_t current_time = ts.tv_sec * 1000 + ts.tv_nsec * 0.000001;

    if (current_time > last_tic)
    {
      last_tic = current_time + TIME_STEP;

      input_mutex.lock();
      Systems::handle_player_input();
      input_mutex.unlock();

      Systems::game_tick(*world);

    }
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

void on_client_message(Network::WebSocket* socket, std::string_view data)
{
  input_mutex.lock();
  client_messages.emplace(data);
  input_mutex.unlock();
}

}