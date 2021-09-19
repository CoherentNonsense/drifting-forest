default : src/main.cpp
	g++ -std=c++17 src/main.cpp src/server.cpp src/game.cpp /usr/local/lib/uSockets.a /usr/local/lib/libdeflate.a -lz -Isrc -Ilibs -lpthread -Wall

clean :
	rm -f a.out