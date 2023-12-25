import { useLocation, useParams } from 'react-router-dom';
import { useGetRoom } from '../resources/room/room.hooks';
import useWebSocket from 'react-use-websocket';
import { Player, ServerMessage } from '@just-belgione/types';
import { WaitingRoom } from './WaitingRoom/WaitingRoom';
import { Game } from './Game/Game';
import { GameOver } from './GameOver/GameOver';
import { useEffect, useState } from 'react';
import { useUser } from '../atoms/userAtom';
import { PageWrapper } from '../components/common/PageWrapper';

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
      shouldReconnect: (closeEvent) => closeEvent.code !== 3000,
      reconnectInterval: 1000,
    }
  );

  const status = lastJsonMessage?.status || room?.status;

  useEffect(() => {
    // Set initial state for players if another message is unable to
    if (room) {
      setPlayers((prev) => (prev.length === 0 ? room.players : prev));
    }
  }, [room]);

  if (
    isLoading ||
    !room ||
    !status ||
    !id ||
    (status === 'PLAYING' && lastJsonMessage === null)
  ) {
    return (
      <PageWrapper>
        <div className="h-[100dvh] flex justify-center items-center text-jo-md w-full">
          Cargando...
        </div>
      </PageWrapper>
    );
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
        room={room}
      />
    );
  }

  if (status === 'FINISHED') {
    return <GameOver lastJsonMessage={lastJsonMessage} room={room} />;
  }

  return <div>Room</div>;
};

export { Room };
