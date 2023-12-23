import { useUser } from '../../atoms/userAtom';
import { useCreateRoom } from '../../resources/room/room.hooks';
import { useLocation, useNavigate } from 'react-router-dom';
import { PageWrapper } from '../common/PageWrapper';
import { Input } from '../common/Input';
import { AnimatePresence, motion } from 'framer-motion';
import {
  appearingButtonVariants,
  appearingButtonVariantsLabels,
} from './Home.animations';
import { Button } from '../common/Button';
import { ButtonLink } from '../common/ButtonLink';

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useUser();
  const { mutateAsync } = useCreateRoom();

  const handleCreateRoom = async () => {
    const { id } = await mutateAsync({ players: [] });
    navigate(`/room/${id}`, { state: { newRoom: true } });
  };

  return (
    <PageWrapper>
      <div className="p-8 grow flex flex-col">
        <img src="/logoimage.png" alt="Solo una" />
        <div className="flex flex-col gap-12 pt-8">
          <Input
            label="(v1) Introduce tu nombre"
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
                className="flex flex-col gap-12 pb-8"
              >
                <Button onClick={handleCreateRoom}>Crear sala</Button>
                <ButtonLink
                  to={{
                    pathname: '/join',
                    search: location.search,
                  }}
                >
                  Entrar a sala
                </ButtonLink>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </PageWrapper>
  );
};

export { Home };
