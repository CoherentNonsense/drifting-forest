#pragma once

#include <stdint.h>

namespace Components
{

struct Position
{
  float x;
  float y;
  int16_t z;
  int16_t scene_id;
};

}