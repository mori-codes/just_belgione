import {
  RoomStatus,
  JoinGameMessage,
  Room,
  SocketMessage,
  Player,
  StartGameMessage,
} from '@just-belgione/types';
import { useEffect, useRef, useState } from 'react';
import { useUser } from '../../atoms/userAtom';

interface Props {
  roomId: Room['_id'];
  status: RoomStatus;
  lastJsonMessage: SocketMessage;
  sendMessage: (jsonMessage: JoinGameMessage | StartGameMessage) => void;
}

const WaitingRoom: React.FC<Props> = ({
  roomId,
  status,
  lastJsonMessage,
  sendMessage,
}) => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [user] = useUser();
  const wasJoinReqSent = useRef(false);
  const userCreatedTheRoom = players?.length && user === players[0];

  // Update the list of players
  useEffect(() => {
    if (!lastJsonMessage || lastJsonMessage.type !== 'playerJoined') return;
    setPlayers(lastJsonMessage.data.players);
  }, [lastJsonMessage]);

  // Notify join.
  useEffect(() => {
    if (wasJoinReqSent.current || status !== 'WAITING' || !roomId || !user)
      return;
    const message: JoinGameMessage = {
      type: 'join',
      data: {
        player: user,
        roomId,
      },
    };
    sendMessage(message);
    wasJoinReqSent.current = true;
  }, [roomId, user, status, sendMessage]);

  const handleStartGame = () => {
    sendMessage({
      type: 'start',
      data: {
        roomId,
      },
    });
  };

  const getPlayers = () =>
    players.map((player) => <li key={player}>{player}</li>);

  return (
    <>
      Esperando a la sala {roomId}
      <div>
        <h2>Jugadores:</h2>
        <ul>{getPlayers()}</ul>
      </div>
      <div>
        {userCreatedTheRoom && (
          <button onClick={handleStartGame}>Empezar</button>
        )}
      </div>
    </>
  );
};

export { WaitingRoom };
