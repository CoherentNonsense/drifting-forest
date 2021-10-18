#pragma once

#include "types.hpp"

namespace ECS
{

Entity make_entity_id(EntityIndex index, EntityVersion version);
EntityIndex get_entity_index(Entity entity);
EntityVersion get_entity_version(Entity entity);

}