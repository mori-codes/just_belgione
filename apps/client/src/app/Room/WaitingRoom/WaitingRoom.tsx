import {
  Room,
  Player,
  StartGameMessage,
  ServerMessage,
  Difficulty,
} from '@just-belgione/types';
import { useEffect, useState } from 'react';
import { useUser } from '../../atoms/userAtom';
import { PageWrapper } from '../../components/common/PageWrapper';
import { PlayerDisplay } from './PlayerDisplay';
import { Button } from '../../components/common/Button';
import { RoomCode } from './RoomCode';
import { useNavigate } from 'react-router-dom';
import { useNotificationContext } from '../../context/NotificationContext';
import { DifficultySelector } from './DifficultySelector';
import { useLocalization } from '../../atoms/localizationAtom';

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
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');
  const userCreatedTheRoom = players?.length && user === players[0];
  const navigate = useNavigate();
  const { enqueueError } = useNotificationContext();
  const { stringTable } = useLocalization();

  // Update the list of players
  useEffect(() => {
    if (!lastJsonMessage || lastJsonMessage.type !== 'playerJoined') return;
    setPlayers(lastJsonMessage.data.players);
  }, [lastJsonMessage, setPlayers]);

  // Handle duplicate player error
  useEffect(() => {
    if (lastJsonMessage && lastJsonMessage.type === 'duplicatePlayerError') {
      enqueueError(lastJsonMessage.data.message);
      navigate('/');
    }
  }, [enqueueError, lastJsonMessage, navigate]);

  const handleStartGame = () => {
    sendMessage({
      type: 'start',
      data: {
        roomId,
        difficulty,
      },
    });
  };

  return (
    <PageWrapper center>
      <div className="flex flex-col grow p-8 py-16 gap-8 overflow-hidden">
        <RoomCode roomId={roomId} />
        <PlayerDisplay players={players} />
        {userCreatedTheRoom ? (
          <DifficultySelector
            difficulty={difficulty}
            setDifficulty={setDifficulty}
          />
        ) : null}
        <div>
          {userCreatedTheRoom ? (
            <Button onClick={handleStartGame}>{stringTable.START_ROOM_BUTTON}</Button>
          ) : null}
        </div>
      </div>
    </PageWrapper>
  );
};

export { WaitingRoom };
