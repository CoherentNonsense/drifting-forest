#pragma once

#include <stdint.h>

namespace Components
{

struct Position
{
  int32_t x;
  int32_t y;
  int16_t z;
  int16_t scene_id;
};

}