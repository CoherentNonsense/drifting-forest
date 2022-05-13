#pragma once

namespace World
{

class WorldGenerator
{
public:
  WorldGenerator();
  ~WorldGenerator();

  void generate_chunk(Chunk& chunk);

private:
  // Generation parameters
};

}