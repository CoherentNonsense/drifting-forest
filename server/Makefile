DIRS := *.cpp network/*.cpp
CFILES := $(foreach DIR, $(DIRS), $(wildcard src/$(DIR)))
OFILES := $(patsubst src/%.cpp, build/%.o, $(CFILES))
# OFILES := $(foreach OFILE, $(OFILES), build/$(notdir $(OFILE)))

INCLUDES = -Isrc -Ilibs -I/usr/local/include
LIBS = /usr/local/lib/uSockets.a /usr/local/lib/libdeflate.a -lz -lpthread

source = src/main.cpp src/network/server.cpp src/game.cpp
includes = -Isrc -Ilibs -I/usr/local/include -lz -lpthread -Wall
libraries = /usr/local/lib/uSockets.a /usr/local/lib/libdeflate.a

all: server

server: $(OFILES)
	g++ $(LIBS) $(OFILES) -o server

build/%.o: src/%.cpp
	g++ -std=c++17 -c $(INCLUDES) -Wall -o $@ $<

default : src/main.cpp
	g++ -std=c++17 -g $(source) $(libraries) $(includes)

clean :
	rm -f a.out

debug:
	echo $(CFILES)
	echo $(OFILES)