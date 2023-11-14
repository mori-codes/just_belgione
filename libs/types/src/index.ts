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

type ActiveRoom = {
  status: RoomStatus;
  playerSockets: Record<string, WebSocket>;
};
type ActiveGames = Record<string, ActiveRoom>;

// MONGO
type MongoFindOneResponse<T> = {
  document: T | null;
};

type MongoInsertResponse = {
  insertedId: string;
};

// SOCKET MESSAGES
// Server messages
type PlayerJoinedMessage = {
  type: 'playerJoined';
  data: {
    players: Player[];
  };
};

type NewRoundMessage = {
  type: 'newRound';
  data: {
    round: Round;
  };
};

type HintReceivedMessage = {
  type: 'hintReceived';
  data: {
    hints: Hint[];
  };
};

// Client messages
type JoinGameMessage = {
  type: 'join';
  data: {
    roomId: string;
    player: Player;
  };
};

type StartGameMessage = {
  type: 'start';
  data: {
    roomId: string;
  };
};

type SendHintMessage = {
  type: 'sendHint';
  data: {
    player: Player;
    roomId: string;
    hint: Word;
  };
};

// Error messages
type DuplicatedPlayerError = {
  type: 'duplicatePlayerError';
  data: {
    message: string;
  };
};

type InvalidGameError = {
  type: 'invalidGameError';
  data: {
    message: string;
  };
};

type ServerMessage = (
  | PlayerJoinedMessage
  | NewRoundMessage
  | DuplicatedPlayerError
  | InvalidGameError
  | HintReceivedMessage
) & { status: RoomStatus };

type ClientMessage = JoinGameMessage | StartGameMessage | SendHintMessage;

// TYPE GUARDS
const isCreateRoomBody = (obj: any): obj is CreateRoomBody =>
  !obj?.players !== undefined;

export type {
  MongoFindOneResponse,
  MongoInsertResponse,
  Room,
  Player,
  RoomStatus,
  CreateRoomBody,
  CreateRoomResponse,
  ServerMessage,
  ClientMessage,
  JoinGameMessage,
  ActiveGames,
  StartGameMessage,
  Round,
  Word,
};
export { isCreateRoomBody };
