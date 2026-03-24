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
    <label className="flex flex-col gap-2">
      <span className="text-base font-bold text-foreground">{label}</span>
      <input
        type={type}
        placeholder={placeholder}
        className="min-h-14 rounded-2xl border border-border bg-white px-4 text-base text-foreground outline-none placeholder:text-muted/70"
      />
    </label>
  );
}
