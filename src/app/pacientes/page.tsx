"use client";

import { useEffect, useState } from "react";
import { PacientesPageView } from "./components/PacientesPageView";
import { getPatients, getPatientUnits } from "./data";
import { PatientListItem, PatientUnitOption } from "./types";

export default function PacientesPage() {
  const [patients, setPatients] = useState<PatientListItem[]>([]);
  const [units, setUnits] = useState<PatientUnitOption[]>([{ id: "all", label: "Todas as unidades", selected: true }]);

  useEffect(() => {
    let active = true;

    async function loadPatientsPage() {
      const [nextPatients, nextUnits] = await Promise.all([getPatients(), getPatientUnits()]);
      if (!active) return;

      setPatients(nextPatients);
      setUnits(nextUnits);
    }

    void loadPatientsPage();

    return () => {
      active = false;
    };
  }, []);

  return <PacientesPageView patients={patients} units={units} />;
}
