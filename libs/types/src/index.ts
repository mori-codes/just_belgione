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
  currentRound?: Round;
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

// This is new.
type FinalHintsMessage = {
  type: 'finalHints';
  data: {
    validHints: Hint[];
    playerGuessing: Player;
  };
};

// This is new.
type RoundResultMessage = {
  type: 'roundResult';
  data: {
    guess: Word;
    correct: boolean;
    wordToGuess: Word;
    roundIndex: number;
    gamePoints: number;
  };
};

// Client messages
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
    roomId: Room['_id'];
    hint: Word;
  };
};

// This is new.
type ConfirmHintsMessage = {
  type: 'confirmHints';
  data: {
    roomId: Room['_id'];
    hints: Hint[];
  };
};

// This is new.
type GuessMessage = {
  type: 'guess';
  data: {
    roomId: Room['_id'];
    word: Word;
  };
};

// This is new.
type StartRoundMessage = {
  type: 'newRound';
  data: {
    roomId: Room['_id'];
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
  | FinalHintsMessage
  | RoundResultMessage
) & { status: RoomStatus };

type ClientMessage =
  | StartGameMessage
  | SendHintMessage
  | ConfirmHintsMessage
  | GuessMessage
  | StartRoundMessage;

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
  ConfirmHintsMessage,
  ServerMessage,
  ClientMessage,
  ActiveGames,
  StartGameMessage,
  Round,
  Word,
  SendHintMessage,
  Hint,
  GuessMessage,
  RoundResultMessage,
  FinalHintsMessage,
  StartRoundMessage,
};
export { isCreateRoomBody };
