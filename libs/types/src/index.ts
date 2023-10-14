// DATA

type Player = string;

type RoomStatus = 'WAITING' | 'PLAYING' | 'FINISHED';

type Room = {
  _id: string;
  players: Player[];
  status: RoomStatus;
};

type CreateRoomBody = Pick<Room, 'players'>;
type CreateRoomResponse = { id: Room['_id'] };

type ActiveGames = Record<string, Record<string, WebSocket>>;

// MONGO
type MongoFindOneResponse<T> = {
  document: T | null;
};

type MongoInsertResponse = {
  insertedId: string;
};

// SOCKET MESSAGES
type JoinGameMessage = {
  type: 'join';
  data: {
    roomId: string;
    player: Player;
  };
};

type PlayerJoinedMessage = {
  type: 'playerJoined';
  data: {
    players: Player[];
  };
};

type LeaveGameMessage = {
  type: 'leaveGame';
  data: {
    roomId: string;
    playerId: string;
  };
};

type SocketMessage = (
  | JoinGameMessage
  | PlayerJoinedMessage
  | LeaveGameMessage
) & {
  status: RoomStatus;
};

// TYPE GUARDS
const isCreateRoomBody = (obj: any): obj is CreateRoomBody => {
  if (!obj?.players === undefined) return false;
  return true;
};

export type {
  MongoFindOneResponse,
  MongoInsertResponse,
  Room,
  Player,
  RoomStatus,
  CreateRoomBody,
  CreateRoomResponse,
  SocketMessage,
  JoinGameMessage,
  ActiveGames,
};
export { isCreateRoomBody };
