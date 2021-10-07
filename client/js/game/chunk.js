class Chunk
{
  constructor(data)
  {
    this.entities = data.entities;
    this.voxels = data.voxels;
  }

  // Updates any changes to the contents of a chunk
  update(data)
  {
    data.delta_entities.forEach((delta_entitiy) => {
      this.entities.get(delta_entitiy.id).update(delta_entitiy.delta);
    });

    data.delta_voxels.forEach((delta_voxel) => {
      thhis.voxels.get(delta_voxel.id).update(delta_voxel.delta);
    });
  }
}

export default Chunk;