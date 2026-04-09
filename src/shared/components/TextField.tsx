interface TextFieldProps {
  label: string;
  placeholder: string;
  type?: string;
  name?: string;
  value?: string;
  error?: string;
  autoComplete?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function TextField({
  label,
  placeholder,
  type = "text",
  name,
  value,
  error,
  autoComplete,
  onChange,
}: TextFieldProps) {
  return (
    <label className="flex flex-col gap-2.5">
      <span className="text-sm font-semibold tracking-[0.01em] text-foreground">{label}</span>
      <input
        name={name}
        type={type}
        value={value}
        autoComplete={autoComplete}
        onChange={onChange}
        placeholder={placeholder}
        className={`min-h-14 rounded-2xl border bg-white px-4 text-base text-foreground shadow-[0_8px_18px_rgba(15,31,56,0.04)] outline-none transition-all placeholder:text-muted/70 focus:border-primary focus:ring-4 focus:ring-primary/10 ${
          error ? "border-[#e67c73] ring-2 ring-[#f6d1cc]" : "border-border"
        }`}
      />
      {error ? <span className="text-sm font-medium text-[#c65349]">{error}</span> : null}
    </label>
  );
}
