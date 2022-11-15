#include "game.hpp"

int main()
{
	Game::init();
	
	Game::run();

	Game::cleanup();
	
	return 0;
}