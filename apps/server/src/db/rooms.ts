import {
  CreateRoomBody,
  MongoFindOneResponse,
  MongoInsertResponse,
  Room,
  Player,
  RoomStatus,
  Round,
  Word,
  Hint,
  Difficulty,
} from '@just-belgione/types';

const getRoom = async (id: string) => {
  const BASE_URL = Deno.env.get('MONGO_BASE_URL');
  const API_KEY = Deno.env.get('MONGO_API_KEY');

  if (!BASE_URL || !API_KEY) throw new Error('Missing environment variables.');

  const res = await fetch(`${BASE_URL}/action/findOne`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Request-Headers': '*',
      'api-key': API_KEY,
    },
    body: JSON.stringify({
      database: 'justone',
      dataSource: 'Cluster',
      collection: 'rooms',
      filter: {
        _id: {
          $oid: id,
        },
      },
    }),
  });

  const data = (await res.json()) as MongoFindOneResponse<Room>;

  return data.document;
};

const createRoom = async (room: CreateRoomBody | Room): Promise<string> => {
  const BASE_URL = Deno.env.get('MONGO_BASE_URL');
  const API_KEY = Deno.env.get('MONGO_API_KEY');
  if (!BASE_URL || !API_KEY) throw new Error('Missing environment variables.');

  const document: Omit<Room, '_id'> = {
    ...room,
    status: 'WAITING',
    rounds: [],

  };

  const res = await fetch(`${BASE_URL}/action/insertOne`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Request-Headers': '*',
      'api-key': API_KEY,
    },
    body: JSON.stringify({
      database: 'justone',
      dataSource: 'Cluster',
      collection: 'rooms',
      document,
    }),
  });

  const data = (await res.json()) as MongoInsertResponse;
  return data.insertedId;
};

const addPlayer = async (id: Room['_id'], player: Player) => {
  const BASE_URL = Deno.env.get('MONGO_BASE_URL');
  const API_KEY = Deno.env.get('MONGO_API_KEY');
  if (!BASE_URL || !API_KEY) throw new Error('Missing environment variables.');

  await fetch(`${BASE_URL}/action/updateOne`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Request-Headers': '*',
      'api-key': API_KEY,
    },
    body: JSON.stringify({
      database: 'justone',
      dataSource: 'Cluster',
      collection: 'rooms',
      filter: {
        _id: {
          $oid: id,
        },
      },
      update: {
        $push: {
          players: player,
        },
      },
    }),
  });
};

const updateGameStatus = async (id: Room['_id'], status: RoomStatus) => {
  const BASE_URL = Deno.env.get('MONGO_BASE_URL');
  const API_KEY = Deno.env.get('MONGO_API_KEY');
  if (!BASE_URL || !API_KEY) throw new Error('Missing environment variables.');

  await fetch(`${BASE_URL}/action/updateOne`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Request-Headers': '*',
      'api-key': API_KEY,
    },
    body: JSON.stringify({
      database: 'justone',
      dataSource: 'Cluster',
      collection: 'rooms',
      filter: {
        _id: {
          $oid: id,
        },
      },
      update: {
        $set: {
          status,
        },
      },
    }),
  });
};

const createRound = async (
  id: Room['_id'],
  playerGuessing: Player,
  wordToGuess: Word,
  previousCurrentRound?: Round,
  difficulty?: Difficulty
) => {
  const BASE_URL = Deno.env.get('MONGO_BASE_URL');
  const API_KEY = Deno.env.get('MONGO_API_KEY');
  if (!BASE_URL || !API_KEY) throw new Error('Missing environment variables.');

  const newRound: Round = {
    playerGuessing,
    wordToGuess,
    hints: [],
  };

  await fetch(`${BASE_URL}/action/updateOne`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Request-Headers': '*',
      'api-key': API_KEY,
    },
    body: JSON.stringify({
      database: 'justone',
      dataSource: 'Cluster',
      collection: 'rooms',
      filter: {
        _id: {
          $oid: id,
        },
      },
      update: {
        $set: {
          currentRound: newRound,
          difficulty,
        },
        $push: previousCurrentRound
          ? {
              rounds: previousCurrentRound,
            }
          : undefined,
      },
    }),
  });
};

const addHint = async (id: Room['_id'], player: Player, hint: Word) => {
  const BASE_URL = Deno.env.get('MONGO_BASE_URL');
  const API_KEY = Deno.env.get('MONGO_API_KEY');
  if (!BASE_URL || !API_KEY) throw new Error('Missing environment variables.');

  await fetch(`${BASE_URL}/action/updateOne`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Request-Headers': '*',
      'api-key': API_KEY,
    },
    body: JSON.stringify({
      database: 'justone',
      dataSource: 'Cluster',
      collection: 'rooms',
      filter: {
        _id: {
          $oid: id,
        },
      },
      update: {
        $push: {
          'currentRound.hints': { player, hint },
        },
      },
    }),
  });
};

const saveHints = async (id: Room['_id'], hints: Hint[]) => {
  const BASE_URL = Deno.env.get('MONGO_BASE_URL');
  const API_KEY = Deno.env.get('MONGO_API_KEY');
  if (!BASE_URL || !API_KEY) throw new Error('Missing environment variables.');

  await fetch(`${BASE_URL}/action/updateOne`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Request-Headers': '*',
      'api-key': API_KEY,
    },
    body: JSON.stringify({
      database: 'justone',
      dataSource: 'Cluster',
      collection: 'rooms',
      filter: {
        _id: {
          $oid: id,
        },
      },
      update: {
        $set: {
          'currentRound.hints': hints,
        },
      },
    }),
  });
};

const updateRoundsWithGuess = async (
  id: Room['_id'],
  wordGuessed: Word,
  isGuessCorrect: boolean
) => {
  const BASE_URL = Deno.env.get('MONGO_BASE_URL');
  const API_KEY = Deno.env.get('MONGO_API_KEY');
  if (!BASE_URL || !API_KEY) throw new Error('Missing environment variables.');

  await fetch(`${BASE_URL}/action/updateOne`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Request-Headers': '*',
      'api-key': API_KEY,
    },
    body: JSON.stringify({
      database: 'justone',
      dataSource: 'Cluster',
      collection: 'rooms',
      filter: {
        _id: {
          $oid: id,
        },
      },
      update: {
        $set: {
          'currentRound.guess': wordGuessed,
          'currentRound.correct': isGuessCorrect,
        },
      },
    }),
  });
};

export {
  getRoom,
  createRoom,
  addPlayer,
  updateGameStatus,
  createRound,
  addHint,
  saveHints,
  updateRoundsWithGuess,
};
