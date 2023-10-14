import axios from 'axios';
import { CreateRoomBody, CreateRoomResponse } from '@just-belgione/types';
import { useMutation } from '@tanstack/react-query';

// Utils
const BASE_URL = process.env.NX_REACT_APP_API_URL;
const PATH = '/rooms';
// const QUERY_KEY = ['rooms'];

// Requests
const post = async (newRoom: CreateRoomBody) => {
  const res = await axios.post<CreateRoomResponse>(
    `${BASE_URL}${PATH}`,
    newRoom
  );

  return res.data;
};

// Hooks
const useCreateRoom = () => useMutation(post);

export { useCreateRoom };
