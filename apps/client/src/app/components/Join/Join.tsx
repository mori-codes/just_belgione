import { Room } from '@just-belgione/types';
import { ChangeEventHandler, useState } from 'react';
import { PageWrapper } from '../common/PageWrapper';
import { Input } from '../common/Input';
import { ButtonLink } from '../common/ButtonLink';

const Join = () => {
  const [roomId, setRoomId] = useState<Room['_id']>("");

  const handleChange: ChangeEventHandler<HTMLInputElement> = ({
    target: { value },
  }) => {
    setRoomId(value);
  };

  return (
    <PageWrapper center>
      <div className='flex flex-col gap-4 p-8 w-full'>
      <Input
        label="Introduce el código de sala:"
        value={roomId}
        onChange={handleChange}
      />
      <ButtonLink to={`/room/${roomId}`}>Unirse</ButtonLink>
      </div>
    </PageWrapper>
  );
};

export { Join };
