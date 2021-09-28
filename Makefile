source = src/main.cpp src/server.cpp src/game.cpp src/world/world.cpp src/world/worldgen.cpp src/world/chunk.cpp
includes = -Isrc -Ilibs -lz -lpthread -Wall
libraries = /usr/local/lib/uSockets.a /usr/local/lib/libdeflate.a

default : src/main.cpp
	g++ -std=c++17 $(source) $(libraries) $(includes)

clean :
	rm -f a.out