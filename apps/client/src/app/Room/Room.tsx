import { useParams } from 'react-router-dom';
import { useGetRoom } from '../resources/room/room.hooks';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { SocketMessage } from '@just-belgione/types';
import { WaitingRoom } from './WaitingRoom/WaitingRoom';
import { Game } from './Game/Game';
import { GameOver } from './GameOver/GameOver';
import { useEffect } from 'react';

const BASE_URL = process.env.NX_REACT_APP_WS_URL;
const PATH = '/ws';

const Room = () => {
  const { id } = useParams();
  const { data: room, isLoading } = useGetRoom(id);

  const { sendJsonMessage, lastJsonMessage, readyState } =
    useWebSocket<SocketMessage>(`${BASE_URL}${PATH}`);
  const status = lastJsonMessage?.status || room?.status;

  if (isLoading || !status || !id) {
    return <>Loading...</>;
  }

  if (status === 'WAITING') {
    return (
      <WaitingRoom
        roomId={id}
        status={status}
        lastJsonMessage={lastJsonMessage}
        sendMessage={sendJsonMessage}
      />
    );
  }

  if (status === 'PLAYING') {
    return <Game />;
  }

  if (status === 'FINISHED') {
    return <GameOver />;
  }

  return <div>Room</div>;
};

export { Room };
