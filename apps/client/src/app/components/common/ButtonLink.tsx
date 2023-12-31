import { Link, LinkProps } from 'react-router-dom';

type Props = {
  children: React.ReactNode;
  to: LinkProps['to'];
  bgColor?: string;
};

const ButtonLink = ({ children, to, bgColor = 'bg-jo-main' }: Props) => {
  return (
    <Link
      to={to}
      replace={false}
      className={`w-full ${bgColor} text-white uppercase text-jo-md rounded-sm shadow-lg py-3 relative text-center after:absolute after:left-1 after:top-1 after:right-1 after:bottom-1 after:rounded-sm after:border-white after:border-2`}
    >
      {children}
    </Link>
  );
};

export { ButtonLink };
