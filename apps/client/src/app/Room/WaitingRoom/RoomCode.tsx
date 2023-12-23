import { useUser } from '../../atoms/userAtom';
import { Copy } from '../../components/icons/Copy';
import { Share } from '../../components/icons/Share';

type Props = {
  roomId: string;
};

const RoomCode = ({ roomId }: Props) => {
  const [user] = useUser();

  const handleCopyClick = () => {
    navigator.clipboard.writeText(roomId);
  };

  const handleShare = () => {
    navigator.share({
      title: `Invitación de ${user}`,
      text: '¡Te han invitado a unirte a una sala de Solo Una! Haz clic en el enlace para unirte',
      url: `${window.location.origin}?inviteId=${roomId}`,
    });
  };

  return (
    <div>
      <h2 className="text-jo-sm">Código de sala:</h2>
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
