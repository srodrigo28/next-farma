interface TextFieldProps {
  label: string;
  placeholder: string;
  type?: string;
}

export function TextField({
  label,
  placeholder,
  type = "text",
}: TextFieldProps) {
  return (
    <label className="flex flex-col gap-2.5">
      <span className="text-sm font-semibold tracking-[0.01em] text-foreground">{label}</span>
      <input
        type={type}
        placeholder={placeholder}
        className="min-h-14 rounded-2xl border border-border bg-white px-4 text-base text-foreground shadow-[0_8px_18px_rgba(15,31,56,0.04)] outline-none transition-all placeholder:text-muted/70 focus:border-primary focus:ring-4 focus:ring-primary/10"
      />
    </label>
  );
}
