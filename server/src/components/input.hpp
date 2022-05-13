#pragma once

#include <bitset>

namespace Components::Input
{

struct Move
{
  std::bitset<8> direction;
};

struct Place
{
  std::bitset<8> direction;
  uint32_t item_id;
};

struct Break
{

};

}