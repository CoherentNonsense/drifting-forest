#pragma once

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
  Packet(const std::string_view& buffer)
  {
    this->buffer.reserve(buffer.size());
    std::memcpy(this->buffer.data(), buffer.data(), buffer.size());
    packet_type = this->read<PacketType>();
  }

  Packet(PacketType type, size_t body_size = 0)
  : type(type)
  {
    buffer.reserve(sizeof(type) + body_size);
    memcpy(buffer.data(), &type, sizeof(type));
  }

  template <typename T>
  void write(T data)
  {
    assert(buffer.size() + sizeof(data) > buffer.capacity() && "Network::Packet::push: Not enough memory reserved.");
    std::memcpy(buffer.data() + buffer.size(), &data, sizeof(T));
  }

  template <typename T>
  T read()
  {
    T data;
    std::memcpy(&data, buffer.data() + front, sizeof(data));
    front += sizeof(data);
    return data;
  }

  const PacketType type() const
  {
    return packet_type;
  }

  const char* data() const
  {
    return buffer.data();
  }

  const size_t size() const
  {
    return buffer.size();
  }

private:
  PacketType packet_type;
  size_t front = 0;
  std::vector<char> buffer;
};

using ServerPacket = Packet<ServerPacketType>;
using ClientPacket = Packet<ClientPacketType>;

}