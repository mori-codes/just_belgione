import { Room } from '@just-belgione/types';
import { ChangeEventHandler, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Join = () => {
  const [roomId, setRoomId] = useState<Room['_id']>();
  const navigate = useNavigate();

  const handleChange: ChangeEventHandler<HTMLInputElement> = ({
    target: { value },
  }) => {
    setRoomId(value);
  };

  const handleJoin = () => {
    navigate(`/room/${roomId}`);
  };

  return (
    <div>
      <input type="text" value={roomId} onChange={handleChange} />
      <button onClick={handleJoin}>Join</button>
    </div>
  );
};

export { Join };
