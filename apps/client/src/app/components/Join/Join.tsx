import { Room } from '@just-belgione/types';
import { ChangeEventHandler, useState } from 'react';
import { PageWrapper } from '../common/PageWrapper';
import { Input } from '../common/Input';
import { ButtonLink } from '../common/ButtonLink';
import { useSearchParams } from 'react-router-dom';
import { useLocalization } from '../../atoms/localizationAtom';

const Join = () => {
  const [searchParams] = useSearchParams();
  const [roomId, setRoomId] = useState<Room['_id']>(
    searchParams.get('inviteId') || ''
  );
  const { stringTable } = useLocalization();

  const handleChange: ChangeEventHandler<HTMLInputElement> = ({
    target: { value },
  }) => {
    setRoomId(value);
  };

  return (
    <PageWrapper center>
      <div className="flex flex-col gap-4 p-8 w-full">
        <Input
          label={stringTable.ROOM_CODE}
          value={roomId}
          onChange={handleChange}
        />
        <ButtonLink to={`/room/${roomId}`}>
          {stringTable.JOIN_BUTTON}
        </ButtonLink>
      </div>
    </PageWrapper>
  );
};

export { Join };
