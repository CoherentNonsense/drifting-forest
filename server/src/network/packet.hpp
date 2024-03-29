#pragma once

#include "server.hpp"
#include <algorithm>
#include <stdint.h>
#include <string>
#include <string_view>
#include <vector>
#include <stdint.h>
#include <assert.h>

namespace Network
{

enum class ServerPacketType : uint16_t
{
  Test,
};

enum class ClientPacketType : uint16_t
{
  Join,
  Leave,
  Move,
};

template <typename PacketType>
struct Packet
{
public:
  Packet(const std::string_view& buffer) {
    this->buffer.reserve(buffer.length());
    std::copy(buffer.begin(), buffer.end(), std::back_inserter(this->buffer));
    packet_type = this->read<PacketType>();
  }

  Packet(PacketType type, size_t body_size = 0)
  : packet_type(type) {
    buffer.reserve(sizeof(type) + body_size);
    this->write<PacketType>(type);
  }

  template <typename T>
  void write(T data) {
    assert(front + sizeof(T) <= buffer.capacity() && "Network::Packet::push: Not enough memory reserved.");
    std::memcpy(buffer.data() + front, &data, sizeof(T));
    front += sizeof(T);
  }

  template <typename T>
  T read() {
    assert(front + sizeof(T) <= buffer.capacity() && "Network::Packet::read: Not enough memoryr reserved.");
    T data;
    std::memcpy(&data, buffer.data() + front, sizeof(T));
    front += sizeof(T);
    return data;
  }

  const PacketType type() const {
    return packet_type;
  }

  const char* data() const {
    return buffer.data();
  }

  const size_t size() const {
    return front;
  }

private:
  PacketType packet_type;
  size_t front = 0;
  std::vector<char> buffer;
};

using ServerPacket = Packet<ServerPacketType>;
using ClientPacket = Packet<ClientPacketType>;

}