type Props = {
  children: React.ReactNode;
  variant?: 'light' | 'dark';
  center?: boolean;
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

const PageWrapper = ({
  children,
  variant = 'light',
  center = false,
}: Props) => {
  return (
    <div
      className={`${center ? '' : 'min-'}h-[100dvh] ${
        BACKGROUND_IMAGES[variant].background
      } w-[100dvw] flex flex-col items-center text-jo-black relative`}
    >
      <div className={`background ${BACKGROUND_IMAGES[variant].image}`} />
      <div
        className={`max-w-[600px] w-full flex grow overflow-hidden ${
          center ? 'justify-center' : ''
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export { PageWrapper };
