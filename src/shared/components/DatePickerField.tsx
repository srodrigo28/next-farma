"use client";

import { useMemo, useRef } from "react";
import { CalendarClockIcon } from "@/shared/components/AppIcons";

type DatePickerMode = "date" | "datetime";

interface DatePickerFieldProps {
  label: string;
  value: string;
  error?: string;
  mode?: DatePickerMode;
  name?: string;
  onChange: (value: string) => void;
}

function onlyDigits(value: string) {
  return value.replace(/\D/g, "");
}

function maskDate(value: string) {
  const digits = onlyDigits(value).slice(0, 8);
  if (digits.length <= 2) return digits;
  if (digits.length <= 4) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
}

function maskDateTime(value: string) {
  const digits = onlyDigits(value).slice(0, 12);
  const date = maskDate(digits.slice(0, 8));
  const timeDigits = digits.slice(8);

  if (!timeDigits) return date;
  if (timeDigits.length <= 2) return `${date} ${timeDigits}`;
  return `${date} ${timeDigits.slice(0, 2)}:${timeDigits.slice(2)}`;
}

function toPickerValue(value: string, mode: DatePickerMode) {
  const dateMatch = value.match(/^(\d{2})\/(\d{2})\/(\d{4})(?:\s(\d{2}):(\d{2}))?$/);
  if (!dateMatch) return "";

  const [, day, month, year, hour = "", minute = ""] = dateMatch;
  const date = `${year}-${month}-${day}`;
  if (mode === "date") return date;
  if (!hour || !minute) return "";
  return `${date}T${hour}:${minute}`;
}

function fromPickerValue(value: string, mode: DatePickerMode) {
  if (!value) return "";

  const [date, time = ""] = value.split("T");
  const [year, month, day] = date.split("-");
  if (!year || !month || !day) return "";

  if (mode === "date") return `${day}/${month}/${year}`;
  return `${day}/${month}/${year} ${time.slice(0, 5)}`;
}

export function DatePickerField({ label, value, error, mode = "date", name, onChange }: DatePickerFieldProps) {
  const pickerRef = useRef<HTMLInputElement>(null);
  const pickerValue = useMemo(() => toPickerValue(value, mode), [mode, value]);
  const placeholder = mode === "date" ? "dd/mm/aaaa" : "dd/mm/aaaa hh:mm";
  const maxLength = mode === "date" ? 10 : 16;

  function handleManualChange(nextValue: string) {
    onChange(mode === "date" ? maskDate(nextValue) : maskDateTime(nextValue));
  }

  function openPicker() {
    const picker = pickerRef.current;
    if (!picker) return;

    try {
      picker.showPicker();
    } catch {
      picker.focus();
      picker.click();
    }
  }

  return (
    <label className="flex flex-col gap-2.5">
      <span className="text-sm font-semibold tracking-[0.01em] text-foreground">{label}</span>
      <span className="relative block">
        <input
          name={name}
          type="text"
          value={value}
          inputMode="numeric"
          maxLength={maxLength}
          onChange={(event) => handleManualChange(event.target.value)}
          placeholder={placeholder}
          className={`min-h-14 w-full rounded-2xl border bg-white px-4 pr-14 text-base text-foreground shadow-[0_8px_18px_rgba(15,31,56,0.04)] outline-none transition-all placeholder:text-muted/70 focus:ring-4 ${
            error ? "border-danger focus:border-danger focus:ring-danger/10" : "border-border focus:border-primary focus:ring-primary/10"
          }`}
        />
        <input
          ref={pickerRef}
          type={mode === "date" ? "date" : "datetime-local"}
          value={pickerValue}
          onChange={(event) => onChange(fromPickerValue(event.target.value, mode))}
          tabIndex={-1}
          aria-hidden="true"
          className="pointer-events-none absolute right-3 top-1/2 h-9 w-9 -translate-y-1/2 opacity-0"
        />
        <button
          type="button"
          onClick={openPicker}
          title="Selecionar data"
          aria-label="Selecionar data"
          className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-xl text-muted transition-colors hover:bg-surface-alt hover:text-foreground focus:outline-none focus:ring-4 focus:ring-primary/10"
        >
          <CalendarClockIcon className="h-5 w-5" />
        </button>
      </span>
      {error ? <span className="text-sm font-medium text-danger">{error}</span> : null}
    </label>
  );
}
