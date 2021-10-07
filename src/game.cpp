#include "game.hpp"

#include "world/world.hpp"
#include "systems/game_tic.hpp"
#include <time.h>
#include <iostream>
#include <mutex>

namespace Game
{

static const int64_t TPS = 1;
static const int64_t TIME_STEP = 1000 / TPS;


// Server
static std::mutex input_mutex;


// Game
static int64_t last_tic = 0;
static bool running = true;
static ECS::Manager ecs;


void init()
{
  Server::run();
}

void run()
{
  timespec ts;
  while (running)
  {
    // Get time
    timespec_get(&ts, TIME_UTC);
    int64_t millis = ts.tv_sec * 1000 + ts.tv_nsec / 1000000;

    if (millis > last_tic)
    {
      input_mutex.lock();
      // Systems::Game::tic();
      input_mutex.unlock();

      last_tic = millis + TIME_STEP;
    }
  }
}

void cleanup()
{
  Server::cleanup();
}

uint32_t player_join()
{
}

void player_leave(uint32_t entity_id)
{

}

// Called by the server
void client_message(Server::WebSocket* socket, std::string_view message)
{
  input_mutex.lock();

  MessageType message_type = static_cast<MessageType>(message.data()[0]);
  std::cout << (unsigned)message_type << std::endl;
  switch (message_type)
  {
    case MessageType::Join:
      socket->getUserData()->client_id = player_join();
      break;
    case MessageType::Leave:
      player_leave(socket->getUserData()->client_id);
      break;
    case MessageType::Input:
      World::player_input(socket->getUserData()->client_id, message);
      break;
  }

  input_mutex.unlock();
}

}