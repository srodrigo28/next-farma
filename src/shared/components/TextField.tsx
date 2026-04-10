interface TextFieldProps {
  label: string;
  placeholder: string;
  type?: string;
  name?: string;
  value?: string;
  error?: string;
  autoComplete?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  maxLength?: number;
  rightAdornment?: React.ReactNode;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
}

export function TextField({
  label,
  placeholder,
  type = "text",
  name,
  value,
  error,
  autoComplete,
  inputMode,
  maxLength,
  rightAdornment,
  onChange,
  onBlur,
}: TextFieldProps) {
  return (
    <label className="flex flex-col gap-2.5">
      <span className="text-sm font-semibold tracking-[0.01em] text-foreground">{label}</span>
      <span className="relative block">
        <input
          name={name}
          type={type}
          value={value}
          autoComplete={autoComplete}
          inputMode={inputMode}
          maxLength={maxLength}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          className={`min-h-14 w-full rounded-2xl border bg-white px-4 text-base text-foreground shadow-[0_8px_18px_rgba(15,31,56,0.04)] outline-none transition-all placeholder:text-muted/70 focus:border-primary focus:ring-4 focus:ring-primary/10 ${
            rightAdornment ? "pr-12" : ""
          } ${error ? "border-[#e67c73] ring-2 ring-[#f6d1cc]" : "border-border"}`}
        />
        {rightAdornment ? (
          <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-muted">
            {rightAdornment}
          </span>
        ) : null}
      </span>
      {error ? <span className="text-sm font-medium text-[#c65349]">{error}</span> : null}
    </label>
  );
}
