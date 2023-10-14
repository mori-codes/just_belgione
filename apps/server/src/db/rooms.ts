import {
  CreateRoomBody,
  MongoFindOneResponse,
  MongoInsertResponse,
  Room,
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
      document: room,
    }),
  });

  const data = (await res.json()) as MongoInsertResponse;
  return data.insertedId;
};

export { getRoom, createRoom };
