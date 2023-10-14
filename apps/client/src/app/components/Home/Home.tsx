import { useUser } from '../../atoms/userAtom';
import { useCreateRoom } from '../../resources/room/room.hooks';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate()

  const [user, setUser] = useUser();
  const { mutateAsync, isLoading } = useCreateRoom();

  const handleCreateRoom = async () => {
    const { id } = await mutateAsync({ players: [user] });
    navigate(`/room/${id}`);
  };

  return (
    <div>
      Nombre: <input value={user} onChange={(e) => setUser(e.target.value)} />
      <br />
      <button onClick={handleCreateRoom}>Crear sala</button>
      <br />
      <button>Unirse a sala</button>
      {isLoading && <div>Creando sala...</div>}
    </div>
  );
};

export { Home };
