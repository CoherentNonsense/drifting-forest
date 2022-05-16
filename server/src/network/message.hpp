#pragma once

#include <stdint.h>
#include <string>
#include <string_view>
#include <vector>
#include <stdint.h>
#include <assert.h>

namespace Network
{

enum class ServerMessageType : uint16_t
{
  Test,
};

enum class ClientMessageType : uint16_t
{
  Join,
  Leave,
};

template <typename MessageType>
struct Message
{
public:
  Message(const std::string_view& buffer)
  {
    this->buffer.reserve(buffer.size());
    std::memcpy(this->buffer.data(), buffer.data(), buffer.size());
  }

  Message(MessageType type, size_t body_size = 0)
  : type(type)
  {
    buffer.reserve(sizeof(type) + body_size);
    memcpy(buffer.data(), &type, sizeof(type));
  }

  template <typename T>
  void write(T data)
  {
    assert(buffer.size() + sizeof(data) > buffer.capacity() && "Network::Message::push: Not enough memory reserved.");
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

  const char* data() const
  {
    return buffer.data();
  }

  size_t size() const
  {
    return buffer.size();
  }

private:
  MessageType type;
  size_t front = 0;
  std::vector<char> buffer;
};

using ServerMessage = Message<ServerMessageType>;
using ClientMessage = Message<ClientMessageType>;

}