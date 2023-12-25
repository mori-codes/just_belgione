import axios from 'axios';
import { CreateRoomBody, CreateRoomResponse, Room } from '@just-belgione/types';
import { useMutation, useQuery } from '@tanstack/react-query';

// Utils
const BASE_URL = process.env.NX_REACT_APP_API_URL;
const PATH = '/rooms';
const QUERY_KEY = 'rooms';

// Requests
const post = async (newRoom: CreateRoomBody) => {
  const res = await axios.post<CreateRoomResponse>(
    `${BASE_URL}${PATH}`,
    newRoom
  );

  return res.data;
};
const get = async (id?: Room['_id']) => {
  const res = await axios.get<Room | null>(`${BASE_URL}${PATH}/${id}`);
  return res.data;
};

// Hooks
const useCreateRoom = () => useMutation(post);
const useGetRoom = (id?: Room['_id']) =>
  useQuery([QUERY_KEY, id], () => get(id), {
    enabled: id !== undefined,
  });

export { useCreateRoom, useGetRoom, QUERY_KEY};
