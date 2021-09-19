#include "game.hpp"
#include <iostream>
#include <thread>

int main()
{
	Game::init();
	Game::run();
	Game::cleanup();
}