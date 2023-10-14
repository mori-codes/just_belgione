type MongoFindOneResponse<T> = {
  document: T | null;
};

type Room = {
  _id: string;
};

export type { MongoFindOneResponse, Room };
