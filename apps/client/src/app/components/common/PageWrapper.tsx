type Props = {
  children: React.ReactNode;
};

const BACKGROUND_IMAGES = {
  light: 'background-light',
};

const PageWrapper = ({ children }: Props) => {
  return (
    <div className="min-h-[100vh] min-w-[100vw] bg-light-gradient flex flex-col text-jo-black">
      <div className={`background ${BACKGROUND_IMAGES['light']}`} />
      {children}
    </div>
  );
};

export { PageWrapper };
