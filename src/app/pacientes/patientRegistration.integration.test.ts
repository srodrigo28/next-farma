import test from "node:test";
import assert from "node:assert/strict";
import { buildNewPatientPayload } from "./submitNewPatient.shared";
import { NewPatientFormData } from "./types";

const API_BASE_URL = process.env.PATIENT_TEST_API_URL || "http://127.0.0.1:5051";

function createForm(recordId: string): NewPatientFormData {
  return {
    fullName: "Maria Clara Teste Integracao",
    recordId,
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

test("web payload creates a patient in the API", async () => {
  const recordId = `REC-INT-${Date.now()}`;
  const response = await fetch(`${API_BASE_URL}/api/v1/patients`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(buildNewPatientPayload(createForm(recordId))),
  });

  const payload = await response.json();

  assert.equal(response.status, 201);
  assert.equal(payload.success, true);
  assert.equal(payload.data.record_id, recordId);
  assert.equal(payload.data.full_name, "Maria Clara Teste Integracao");
});

test("web payload receives duplicate record_id validation from the API", async () => {
  const recordId = `REC-DUP-${Date.now()}`;
  const body = JSON.stringify(buildNewPatientPayload(createForm(recordId)));

  const firstResponse = await fetch(`${API_BASE_URL}/api/v1/patients`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  });

  assert.equal(firstResponse.status, 201);

  const duplicateResponse = await fetch(`${API_BASE_URL}/api/v1/patients`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  });

  const duplicatePayload = await duplicateResponse.json();

  assert.equal(duplicateResponse.status, 422);
  assert.equal(duplicatePayload.success, false);
  assert.equal(duplicatePayload.errors.record_id, "Ja existe paciente com este prontuario.");
});


