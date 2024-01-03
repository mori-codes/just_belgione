import { useLocalization } from '../../atoms/localizationAtom';
import { useUser } from '../../atoms/userAtom';
import { Copy } from '../../components/icons/Copy';
import { Share } from '../../components/icons/Share';

type Props = {
  roomId: string;
};

const RoomCode = ({ roomId }: Props) => {
  const [user] = useUser();
  const { stringTable } = useLocalization();

  const handleCopyClick = () => {
    navigator.clipboard.writeText(roomId);
  };

  const handleShare = () => {
    navigator.share({
      title: `${stringTable.INVITE_MESSAGE_TITLE} ${user}`,
      text: stringTable.INVITE_MESSAGE_DESCRIPTION,
      url: `${window.location.origin}?inviteId=${roomId}`,
    });
  };

  return (
    <div>
      <h2 className="text-jo-sm">{stringTable.ROOM_CODE}</h2>
      <div className="bg-white rounded-sm shadow-lg flex p-4 justify-between gap-4">
        <p className="text-jo-sm text-jo-light-black truncate">{roomId}</p>
        <div className="flex shrink-0 gap-2">
          <button onClick={handleCopyClick}>
            <Copy />
          </button>
          <button onClick={handleShare}>
            <Share />
          </button>
        </div>
      </div>
    </div>
  );
};
export { RoomCode };
