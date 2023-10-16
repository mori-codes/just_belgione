type Props = {
  children: React.ReactNode;
};

const BACKGROUND_IMAGES = {
  light: 'background-light',
};

const PageWrapper = ({ children }: Props) => {
  return (
    <div className="min-h-[100vh] bg-light-gradient flex flex-col items-center text-jo-black">
      <div className={`background ${BACKGROUND_IMAGES['light']}`} />
      <div className="max-w-[600px]">{children}</div>
    </div>
  );
};

export { PageWrapper };
