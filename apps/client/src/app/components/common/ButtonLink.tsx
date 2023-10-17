import { Link } from 'react-router-dom';

type Props = {
  children: React.ReactNode;
  to: string;
};

const ButtonLink = ({ children, to }: Props) => {
  return (
    <Link
      to={to}
      className="w-full bg-jo-main text-white uppercase text-jo-md rounded-sm shadow-lg py-3 relative text-center after:absolute after:left-1 after:top-1 after:right-1 after:bottom-1 after:rounded-sm after:border-white after:border-2"
    >
      {children}
    </Link>
  );
};

export { ButtonLink };
