import test from "node:test";
import assert from "node:assert/strict";
import { validateNewPatientForm } from "./schema";
import { NewPatientFormData } from "./types";
import {
  buildNewPatientErrorResult,
  buildNewPatientPayload,
  mapNewPatientApiErrors,
} from "./submitNewPatient.shared";

function createValidForm(): NewPatientFormData {
  return {
    fullName: "Maria Clara",
    recordId: "REC-002",
    sex: "female",
    bed: "12",
    sector: "UTI Adulto",
    admissionDate: "11/04/2026",
    unit: "UTI Adulto",
    allergies: "Dipirona",
    notes: "Paciente em observacao.",
    isTrainingPatient: false,
  };
}

test("validateNewPatientForm rejects fields required by the API", () => {
  const result = validateNewPatientForm({
    ...createValidForm(),
    recordId: "",
    bed: "",
    sector: "",
  });

  assert.equal(result.isValid, false);
  assert.deepEqual(result.errors, {
    recordId: "Informe o prontuário ou CNS.",
    bed: "Informe o leito do paciente.",
    sector: "Informe o setor ou ala.",
  });
});

test("validateNewPatientForm accepts a complete patient registration", () => {
  const result = validateNewPatientForm(createValidForm());

  assert.equal(result.isValid, true);
  assert.deepEqual(result.errors, {});
});

test("buildNewPatientPayload maps the web form to the API contract", () => {
  const payload = buildNewPatientPayload(createValidForm());

  assert.deepEqual(payload, {
    full_name: "Maria Clara",
    record_id: "REC-002",
    sex: "female",
    bed: "12",
    sector: "UTI Adulto",
    admission_date: "11/04/2026",
    unit: "UTI Adulto",
    allergies: "Dipirona",
    notes: "Paciente em observacao.",
    is_training_patient: false,
  });
});

test("mapNewPatientApiErrors maps API field names back to form fields", () => {
  const errors = mapNewPatientApiErrors({
    record_id: "Já existe paciente com este prontuário.",
    unit: "Campo obrigatorio",
    ignored_field: "não deve aparecer",
  });

  assert.deepEqual(errors, {
    recordId: "Já existe paciente com este prontuário.",
    unit: "Campo obrigatorio",
  });
});

test("buildNewPatientErrorResult keeps the API message and mapped field errors", () => {
  const result = buildNewPatientErrorResult({
    success: false,
    message: "Revise os campos informados.",
    errors: {
      record_id: "Já existe paciente com este prontuário.",
      bed: "Campo obrigatorio",
    },
  });

  assert.deepEqual(result, {
    ok: false,
    message: "Revise os campos informados.",
    errors: {
      recordId: "Já existe paciente com este prontuário.",
      bed: "Campo obrigatorio",
    },
  });
});

