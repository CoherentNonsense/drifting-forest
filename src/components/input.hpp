#pragma once

#include <bitset>

namespace Components
{

namespace
{
  struct Placement
  {
    std::bitset<8> direction;
    uint32_t item_id;
  };
}

struct Input
{
  std::bitset<8> move_direction;
  std::bitset<8> break_direction;
  Placement placement;
};

}