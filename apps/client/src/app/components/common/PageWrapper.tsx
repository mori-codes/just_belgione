type Props = {
  children: React.ReactNode;
  variant?: 'light' | 'dark';
};

const BACKGROUND_IMAGES = {
  light: {
    image: 'background-light',
    background: 'bg-light-gradient',
  },
  dark: {
    image: 'background-dark',
    background: 'bg-dark-gradient',
  },
} as const;

const PageWrapper = ({ children, variant = 'light' }: Props) => {
  return (
    <div
      className={`min-h-[100dvh] ${BACKGROUND_IMAGES[variant].background} flex flex-col items-center text-jo-black relative`}
    >
      <div className={`background ${BACKGROUND_IMAGES[variant].image}`} />
      <div className="max-w-[600px]">{children}</div>
    </div>
  );
};

export { PageWrapper };
