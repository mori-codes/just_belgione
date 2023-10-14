type MongoFindOneResponse<T> = {
  document: T | null;
};

type MongoInsertResponse = {
  insertedId: string;
};

type Player = string;

type CreateRoomBody = {
  players: Player[];
};

type Room = CreateRoomBody & {
  _id: string;
};

export const isCreateRoomBody = (obj: any): obj is CreateRoomBody => {
  if (!obj?.players?.length) return false;
  return true;
};

export type { MongoFindOneResponse, MongoInsertResponse, Room, CreateRoomBody };
