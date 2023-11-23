const GRADIENT_COLORS = {
  black: 'bg-gradient-to-b from-transparent to-50% to-jo-black',
  green: 'bg-gradient-to-b from-transparent to-50% to-jo-green',
  main: 'bg-gradient-to-b from-transparent to-50% to-jo-main',
} as const;

type Props = {
  color?: keyof typeof GRADIENT_COLORS;
  children?: React.ReactNode;
};

const BottomGradient = ({ children, color = "main" }: Props) => {
  return <div className={`fixed bottom-0 w-[100vw] py-8 ${GRADIENT_COLORS[color]}`}>{children}</div>;
};

export { BottomGradient };
