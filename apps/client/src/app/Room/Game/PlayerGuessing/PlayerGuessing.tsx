import { ServerMessage } from "@just-belgione/types";

type Props = {
  lastJsonMessage: ServerMessage;
}

const PlayerGuessing: React.FC<Props> = () => {
  return (
    <div>
      <h2>¡Es tu turno!</h2>
      <p>Tus compañeros están pensando cuál es la mejor pista.</p>
    </div>
  );
};

export { PlayerGuessing };