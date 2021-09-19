#include "worldgen.hpp"

#include <simplex/SimplexNoise.hpp>

namespace World
{

static SimplexNoise<double> simplex;

void generate(int32_t world_x, int32_t world_y)
{
  simplex.noise2(static_cast<double>(world_x), static_cast<double>(world_y));
}

}