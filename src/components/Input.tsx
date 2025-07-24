export function Input({
  value,
  onChange,
  placeholder,
  disabled = false
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  disabled?: boolean;
}) {
  return (
    <input
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      className={`
        font-raleway text-text bg-surface border border-muted
        rounded-md px-3 py-2
        focus:outline-none focus:ring-2 focus:ring-primary
        transition-colors duration-200
        ${
          disabled
            ? "bg-disabled-bg text-disabled-text cursor-not-allowed border-disabled-bg"
            : "hover:border-primary"
        }
      `}
    />
  );
}
