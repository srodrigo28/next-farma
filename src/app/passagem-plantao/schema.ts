import { NewHandoffNoteErrors, NewHandoffNoteFormData } from "./types";

export function validateHandoffNote(data: NewHandoffNoteFormData) {
  const errors: NewHandoffNoteErrors = {};

  if (!data.unit.trim()) errors.unit = "Selecione a unidade.";
  if (!data.shift.trim()) errors.shift = "Selecione o plantão.";
  if (!data.summary.trim()) errors.summary = "Preencha o resumo da passagem.";

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
