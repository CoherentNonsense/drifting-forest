source = src/main.cpp src/network/server.cpp src/game.cpp
includes = -Isrc -Ilibs -lz -lpthread -Wall
libraries = /usr/local/lib/uSockets.a /usr/local/lib/libdeflate.a

default : src/main.cpp
	g++ -std=c++17 -g $(source) $(libraries) $(includes)

clean :
	rm -f a.out