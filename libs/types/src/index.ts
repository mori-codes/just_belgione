// DATA

type Player = string;

type Word = string;

type Hint = {
  player: Player;
  hint: Word;
  isValid?: boolean;
};

type RoomStatus = 'WAITING' | 'PLAYING' | 'FINISHED';

type Difficulty = 'easy' | 'normal' | 'hard' | 'veryHard' | 'all' | 'm&p';
type AvailableLanguages = 'spanish' | 'english';

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
  difficulty?: Difficulty;
  language: AvailableLanguages;
};

type CreateRoomBody = Pick<Room, 'players' | 'language'>;
type CreateRoomResponse = { id: Room['_id'] };

type ActiveRoom = {
  status: RoomStatus;
  playerSockets: Record<string, WebSocket>;
  lastMessage?: ServerMessage;
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

type FinalHintsMessage = {
  type: 'finalHints';
  data: {
    validHints: Hint[];
    playerGuessing: Player;
  };
};

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

type GameOverMessage = {
  type: 'gameOver';
  data: {
    room: Room;
  };
};

// Client messages
type StartGameMessage = {
  type: 'start';
  data: {
    roomId: string;
    difficulty: Difficulty;
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

type UpdateHintsMessage = {
  type: 'updateHints';
  data: {
    roomId: Room['_id'];
    hints: Hint[];
  };
};

type ConfirmHintsMessage = {
  type: 'confirmHints';
  data: {
    roomId: Room['_id'];
    hints: Hint[];
  };
};

type GuessMessage = {
  type: 'guess';
  data: {
    roomId: Room['_id'];
    word: Word;
  };
};

type StartRoundMessage = {
  type: 'newRound';
  data: {
    roomId: Room['_id'];
    difficulty?: Difficulty;
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
  | GameOverMessage
) & { status: RoomStatus };

type ClientMessage =
  | StartGameMessage
  | SendHintMessage
  | ConfirmHintsMessage
  | GuessMessage
  | StartRoundMessage
  | UpdateHintsMessage;

// TYPE GUARDS
const isCreateRoomBody = (obj: any): obj is CreateRoomBody =>
  obj?.players !== undefined && obj?.language !== undefined;

export type {
  MongoFindOneResponse,
  MongoInsertResponse,
  Room,
  Player,
  RoomStatus,
  CreateRoomBody,
  CreateRoomResponse,
  UpdateHintsMessage,
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
  Difficulty,
  AvailableLanguages,
};
export { isCreateRoomBody };
