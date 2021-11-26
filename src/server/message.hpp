#pragma once

#include <stdint.h>
#include <string>
#include <vector>
#include <stdint.h>

namespace Server
{

enum ServerMessageType : uint16_t
{
  Hello,
  There,
  Bois
};

enum ClientMessageType : uint16_t
{

};

template <typename MessageType>
struct MessageHeader
{
  MessageType type;
  uint16_t size;
};

template <typename Header>
struct Message
{
public:
  Message(Header header)
  {
    // buffer.resize(sizeof(Header));
    // memcpy(buffer.data(), header, sizeof(Header));
  }

  template <typename T>
  void push(T data)
  {
    // buffer.resize(buffer.size() + sizeof(T));
    // std::memcpy(buffer.data() + buffer.size(), &data, sizeof(T));
    // std::memcpy(buffer.data() + 2 );
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
  std::vector<char> buffer;
};

using ServerHeader = MessageHeader<ServerMessageType>;
using ClientHeader = MessageHeader<ClientMessageType>;

using ServerMessage = Message<ServerHeader>;
using ClientMessage = Message<ClientHeader>;

}