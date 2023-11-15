import { useLocation, useParams } from 'react-router-dom';
import { useGetRoom } from '../resources/room/room.hooks';
import useWebSocket from 'react-use-websocket';
import { Player, ServerMessage } from '@just-belgione/types';
import { WaitingRoom } from './WaitingRoom/WaitingRoom';
import { Game } from './Game/Game';
import { GameOver } from './GameOver/GameOver';
import { useState } from 'react';
import { useUser } from '../atoms/userAtom';

const BASE_URL = process.env.NX_REACT_APP_WS_URL;
const PATH = '/ws';

const Room = () => {
  const { id } = useParams();
  const location = useLocation();
  const [user] = useUser();
  const [players, setPlayers] = useState<Player[]>([]);
  const { data: room, isLoading } = useGetRoom(id);

  // If the room is not ready, do not trigger a socket connection
  const socketUrl =
    room?.status === 'FINISHED' || !room?._id || !user
      ? null
      : `${BASE_URL}${PATH}?roomId=${id}&player=${user}${
          location.state?.newRoom ? '&newRoom=true' : ''
        }`;

  const { sendJsonMessage, lastJsonMessage } = useWebSocket<ServerMessage>(
    socketUrl,
    {
      shouldReconnect: () => true,
      reconnectInterval: 1000,
    }
  );

  const status = lastJsonMessage?.status || room?.status;

  if (isLoading || !status || !id) {
    return <>Loading...</>;
  }

  if (status === 'WAITING') {
    return (
      <WaitingRoom
        roomId={id}
        lastJsonMessage={lastJsonMessage}
        sendMessage={sendJsonMessage}
        players={players}
        setPlayers={setPlayers}
      />
    );
  }

  if (status === 'PLAYING') {
    return (
      <Game
        players={players}
        lastJsonMessage={lastJsonMessage}
        sendMessage={sendJsonMessage}
      />
    );
  }

  if (status === 'FINISHED') {
    return <GameOver />;
  }

  return <div>Room</div>;
};

export { Room };
