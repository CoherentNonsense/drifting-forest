#include "game.hpp"

#include "server.hpp"
#include <time.h>
#include <iostream>
#include <thread>
#include <mutex>
#include <queue>

namespace Game
{

// Constants
static const int64_t TPS = 1;
static const int64_t TIME_STEP = 1000 / TPS;

// Server
static std::thread server_thread;
// static std::queue<std::pair<Server::WebSocket, std::string_view>> input_queue;
static std::mutex input_mutex;

// Game
static int64_t last_tic = 0;
static bool running = true;

/**
 * Game tic
 */
static void tic()
{  
  // Move Entities
  
  // Update Chunks

}

void init()
{
  server_thread = std::thread{ Server::run };
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
      last_tic = millis + TIME_STEP;
      tic();
      input_mutex.unlock();
    }
    else
    {
      // Precalculate stuff while waiting for next tic
    }
  }
}

void cleanup()
{
  Server::cleanup();
}

void client_connect(Server::WebSocket* socket)
{
  std::cout << "Connected" << std::endl;
}

void client_disconnect(Server::WebSocket* socket)
{
  std::cout << "Disconnected" << std::endl;
}

void client_message(Server::WebSocket* socket, std::string_view message)
{
  input_mutex.lock();
  Server::broadcast("pong");
  input_mutex.unlock();
}

}