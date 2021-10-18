source =
	src/main.cpp
	src/server.cpp
	src/game.cpp

	src/world/chunk.cpp
	src/world/voxel.cpp
	src/world/world_generator.cpp
	src/world/world.cpp

	src/ecs/ecs.cpp
	src/ecs/component_array.cpp
includes = -Isrc -Ilibs -lz -lpthread -Wall
libraries = /usr/local/lib/uSockets.a /usr/local/lib/libdeflate.a

default : src/main.cpp
	g++ -std=c++17 $(source) $(libraries) $(includes)

clean :
	rm -f a.out