import { useUser } from '../../atoms/userAtom';
import { useCreateRoom } from '../../resources/room/room.hooks';
import { useNavigate } from 'react-router-dom';
import { PageWrapper } from '../common/PageWrapper';
import { Input } from '../common/Input';
import { AnimatePresence, motion } from 'framer-motion';
import {
  appearingButtonVariants,
  appearingButtonVariantsLabels,
} from './Home.animations';
import { Button } from '../common/Button';

const Home = () => {
  const navigate = useNavigate();

  const [user, setUser] = useUser();
  const { mutateAsync } = useCreateRoom();

  const handleCreateRoom = async () => {
    const { id } = await mutateAsync({ players: [] });
    navigate(`/room/${id}`);
  };

  const handleJoinRoom = () => {
    navigate(`/join`);
  };

  return (
    <PageWrapper>
      <div className="p-8 grow flex flex-col">
        <img src="/logoimage.png" alt="Solo una" />
        <div className='flex flex-col gap-12 pt-8'>
          <Input
            label="Introduce tu nombre"
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
          <AnimatePresence>
            {user.length ? (
              <motion.div
                variants={appearingButtonVariants}
                initial={appearingButtonVariantsLabels.hidden}
                animate={appearingButtonVariantsLabels.visible}
                exit={appearingButtonVariantsLabels.hidden}
                key="homeButtons"
                className='flex flex-col gap-12'
              >
                <Button onClick={handleCreateRoom}>Crear sala</Button>
                <Button onClick={handleJoinRoom}>Unirse a sala</Button>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </PageWrapper>
  );
};

export { Home };
