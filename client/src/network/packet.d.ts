export enum ServerPacketIds
{
  LoadChunk, UpdateChunk, UpdateEntities
}

export enum ClientPacketIds
{
  Move
}

export type ServerPacket = {
  id : ServerPacketIds;
  data : any;
};

export type ClientPacket = {
  id : ClientPacketIds;
  data : any;
};