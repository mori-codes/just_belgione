import { useParams } from 'react-router-dom';
import { useGetRoom } from '../resources/room/room.hooks';
import useWebSocket from 'react-use-websocket';
import { JoinGameMessage, Player, ServerMessage } from '@just-belgione/types';
import { WaitingRoom } from './WaitingRoom/WaitingRoom';
import { Game } from './Game/Game';
import { GameOver } from './GameOver/GameOver';
import { useEffect, useRef, useState } from 'react';
import { useUser } from '../atoms/userAtom';

const BASE_URL = process.env.NX_REACT_APP_WS_URL;
const PATH = '/ws';

const Room = () => {
  const { id } = useParams();
  const [user] = useUser();
  const [players, setPlayers] = useState<Player[]>([]);
  const { data: room, isLoading } = useGetRoom(id);
  const wasJoinReqSent = useRef(false);

  const { sendJsonMessage, lastJsonMessage } = useWebSocket<ServerMessage>(
    `${BASE_URL}${PATH}`
  );
  const status = lastJsonMessage?.status || room?.status;

  // Notify join.
  useEffect(() => {
    if (wasJoinReqSent.current || status === 'FINISHED' || !room?._id || !user)
      return;
    const message: JoinGameMessage = {
      type: 'join',
      data: {
        player: user,
        roomId: room._id,
      },
    };
    sendJsonMessage(message);
    wasJoinReqSent.current = true;
  }, [room, user, status, sendJsonMessage]);

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
      <Game lastJsonMessage={lastJsonMessage} sendMessage={sendJsonMessage} />
    );
  }

  if (status === 'FINISHED') {
    return <GameOver />;
  }

  return <div>Room</div>;
};

export { Room };
