#pragma once

#include "network/packet.hpp"

#include <mutex>
#include <stack>
#include <stdint.h>
#include <thread>

namespace Game
{

const int64_t TPS = 20;
const int64_t TIME_STEP = 1000 / TPS;

struct Data {
  bool running;
  int64_t game_tick;
  std::mutex client_input_mutex;
  std::thread network_thread;
  std::stack<Network::ClientPacket> client_messages;
};

}