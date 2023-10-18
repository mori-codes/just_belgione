import { Copy } from '../../components/icons/Copy';

type Props = {
  roomId: string;
};

const RoomCode = ({ roomId }: Props) => {
  const handleCopyClick = () => {
    navigator.clipboard.writeText(roomId);
  };

  return (
    <div>
      <h2 className="text-jo-sm">Código de sala:</h2>
      <div className="bg-white rounded-sm shadow-lg flex p-4 justify-between gap-4">
        <p className="text-jo-sm text-jo-light-black truncate">{roomId}</p>
        <button className="shrink-0" onClick={handleCopyClick}>
          <Copy />
        </button>
      </div>
    </div>
  );
};
export { RoomCode };
