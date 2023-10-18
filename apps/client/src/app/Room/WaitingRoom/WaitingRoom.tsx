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
import { PageWrapper } from '../../components/common/PageWrapper';
import { PlayerDisplay } from './PlayerDisplay';
import { Button } from '../../components/common/Button';
import { RoomCode } from './RoomCode';

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

  return (
    <PageWrapper center>
      <div className="flex flex-col grow p-8 py-16 gap-8 overflow-hidden">
        <RoomCode roomId={roomId} />
        <PlayerDisplay players={players} />
        <div>
          {userCreatedTheRoom && (
            <Button onClick={handleStartGame}>Empezar</Button>
          )}
        </div>
      </div>
    </PageWrapper>
  );
};

export { WaitingRoom };
