// DATA

type Player = string;

type Room = {
  _id: string;
  players: Player[];
};

type CreateRoomBody = Pick<Room, 'players'>;
type CreateRoomResponse = {id: Room["_id"]}

// MONGO
type MongoFindOneResponse<T> = {
  document: T | null;
};

type MongoInsertResponse = {
  insertedId: string;
};

// TYPE GUARDS
const isCreateRoomBody = (obj: any): obj is CreateRoomBody => {
  if (!obj?.players?.length) return false;
  return true;
};

export type { MongoFindOneResponse, MongoInsertResponse, Room, CreateRoomBody, CreateRoomResponse };
export { isCreateRoomBody };
