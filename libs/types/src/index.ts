// DATA

type Player = string;

type Word = string;

type Hint = {
  player: Player;
  hint: Word;
  isValid?: boolean;
};

type RoomStatus = 'WAITING' | 'PLAYING' | 'FINISHED';

type Round = {
  playerGuessing: Player;
  wordToGuess: Word;
  hints: Hint[];
  guess?: Word;
  correct?: boolean;
};

type Room = {
  _id: string;
  /**
   * The list of players. The first player in the list is
   * the one who created the room. */
  players: Player[];
  status: RoomStatus;
  rounds: Round[];
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

type StartGameMessage = {
  type: 'start';
  data: {
    roomId: string;
  };
};

type NewRoundMessage = {
  type: 'newRound';
  data: {
    round: Round;
  };
};

type DuplicatedPlayerError = {
  type: 'duplicatePlayerError';
  data: {
    message: string;
  };
};

// TODO: Maybe split types into two, server -> client and client -> server
type SocketMessage = (
  | JoinGameMessage
  | PlayerJoinedMessage
  | StartGameMessage
  | NewRoundMessage
  | DuplicatedPlayerError
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
  StartGameMessage,
  Round,
  Word,
};
export { isCreateRoomBody };
