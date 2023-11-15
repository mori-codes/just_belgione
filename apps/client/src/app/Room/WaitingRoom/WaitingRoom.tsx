import {
  Room,
  Player,
  StartGameMessage,
  ServerMessage,
} from '@just-belgione/types';
import { useEffect } from 'react';
import { useUser } from '../../atoms/userAtom';
import { PageWrapper } from '../../components/common/PageWrapper';
import { PlayerDisplay } from './PlayerDisplay';
import { Button } from '../../components/common/Button';
import { RoomCode } from './RoomCode';
import { useNavigate } from 'react-router-dom';

type Props = {
  roomId: Room['_id'];
  lastJsonMessage: ServerMessage;
  sendMessage: (jsonMessage: StartGameMessage) => void;
  players: Player[];
  setPlayers: React.Dispatch<React.SetStateAction<Player[]>>;
};

const WaitingRoom: React.FC<Props> = ({
  roomId,
  lastJsonMessage,
  sendMessage,
  players,
  setPlayers,
}) => {
  const [user] = useUser();
  const userCreatedTheRoom = players?.length && user === players[0];
  const navigate = useNavigate();

  // Update the list of players
  useEffect(() => {
    if (!lastJsonMessage || lastJsonMessage.type !== 'playerJoined') return;
    setPlayers(lastJsonMessage.data.players);
  }, [lastJsonMessage, setPlayers]);

  // Handle duplicate player error
  useEffect(() => {
    if (lastJsonMessage && lastJsonMessage.type === 'duplicatePlayerError') {
      // TODO: Display error message
      navigate(`/?error=${lastJsonMessage.data.message}`);
    }
  }, [lastJsonMessage, navigate]);

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
