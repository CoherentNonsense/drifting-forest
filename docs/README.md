# Documentation
Not really informative. Just a temporary place to put stuff for myself.

## World Generation
As resources are an important part of the world, only the barebones of world generation will be done client side. The world data sent to the client will only be things that are visible to the player. (e.g. no ores that are below the surface)

## Data Structures

### Voxel & Chunk
The world is split up into 64x64x256 chunks. Since this is a 2D top down game, you view the altitude in layers, only being able to see a layer at a time and any surface that is below.

```c++
struct Voxel
{
  VoxelId id; // enum
  int32_t x;
  int32_t y;
  uint8_t z;
};

struct Chunk
{
  int32_t x;
  int32_t y;
  Voxel* modifications;
}
```

### Packet
Data is constantly sent between the client and the server. To keep the bandwidth small, the data is sent with a custom binary protocol.

```c++
struct Packet
{
  PacketId id; // enum
  char* data;
}
```

Every packet will contain an id. The data sent will depend on the id

client -> server packets
 id           | data
 --           | --
 Move   | direction: 4 bits

server -> client packets
 id           | data
 --           | --
 Update       | entities
 Chunk        | chunk