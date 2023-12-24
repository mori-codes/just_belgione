type Props = {
  className?: string;
  viewBox?: string;
};

const ArrowRight = ({
  className = 'w-6 h-6',
  viewBox = '0 0 24 24',
}: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="white"
      viewBox={viewBox}
      strokeWidth={3}
      stroke="currentColor"
      className={className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
      />
    </svg>
  );
};

export { ArrowRight };
