type Props = {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
};

const Input = ({ value, onChange, label }: Props) => {
  return (
    <div className="flex flex-col">
      {label ? <label className="text-jo-sm">{label}</label> : null}
      <input
        type="text"
        value={value}
        onChange={onChange}
        className="h-[50px] p-4 rounded-sm shadow-lg text-jo-sm focus-visible:outline-0"
      />
    </div>
  );
};

export { Input };
