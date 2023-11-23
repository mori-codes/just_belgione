type Props = {
  onClick?: () => void;
  children?: React.ReactNode;
  bgColor?: string;
  disabled?: boolean;
};

const Button = ({
  onClick,
  children,
  bgColor = 'bg-jo-main',
  disabled,
}: Props) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full ${bgColor} text-white uppercase text-jo-md rounded-sm shadow-lg py-3 relative after:absolute after:left-1 after:top-1 after:right-1 after:bottom-1 after:rounded-sm after:border-white after:border-2`}
    >
      {children}
    </button>
  );
};

export { Button };
