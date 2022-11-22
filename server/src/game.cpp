#include "game.hpp"

#include "game_data.hpp"
#include "network/packet.hpp"

#include <chrono>
#include <time.h>
#include <iostream>
#include <mutex>
#include <memory>
#include <stack>
#include <thread>
#include <unistd.h>


namespace Game
{

static Data game_data{};

void init() {
  Network::start_server();
}

void run() {
  timespec ts;
  int64_t next_tick_timer = 0;
  game_data.running = true;
  while (game_data.running) {
    // Timing
    timespec_get(&ts, TIME_UTC);
    int64_t current_time = ts.tv_sec * 1000 + ts.tv_nsec * 0.000001;
    if (current_time > next_tick_timer) {
      game_data.game_tick += 1;
      
      game_data.client_input_mutex.lock();

      auto message_optional = Network::poll();
      while (message_optional.has_value()) {
        auto message = message_optional.value();
        Network::WebSocket* socket = message.first;
        Network::ClientPacket packet = message.second;
        printf("INCOMNG: %hu\n", packet.type());
  
        Network::ServerPacket server_packet = Network::ServerPacket(Network::ServerPacketType::Test, 2);
        server_packet.write<uint16_t>(packet.read<uint16_t>());

        Network::send(socket, server_packet);
        
        message_optional = Network::poll();
      }

      game_data.client_input_mutex.unlock();

      next_tick_timer = current_time + TIME_STEP;
      std::this_thread::sleep_for(std::chrono::milliseconds(50));
    }
  }
}

void cleanup() {
  Network::cleanup();
}

}