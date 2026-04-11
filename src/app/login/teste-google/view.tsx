"use client";

import Link from "next/link";
import { useState } from "react";
import { AppScreen } from "@/shared/components/AppScreen";
import { PrimaryButton } from "@/shared/components/PrimaryButton";
import { getGoogleClientId, requestGoogleCredential } from "@/shared/lib/google-auth";
import { submitGoogleLogin } from "../actions";

type DebugStep =
  | "idle"
  | "loading_google"
  | "credential_received"
  | "sending_api"
  | "success"
  | "error";

interface DebugState {
  step: DebugStep;
  message: string;
  origin: string;
  clientId: string;
  credentialPreview: string;
  apiMessage: string;
}

function maskClientId(clientId: string) {
  if (!clientId) return "(vazio)";
  if (clientId.length <= 18) return clientId;
  return `${clientId.slice(0, 12)}...${clientId.slice(-18)}`;
}

function maskCredential(credential: string) {
  if (!credential) return "(nao recebida)";
  if (credential.length <= 24) return credential;
  return `${credential.slice(0, 12)}...${credential.slice(-12)}`;
}

export function GoogleLoginDebugView() {
  const [state, setState] = useState<DebugState>({
    step: "idle",
    message: "Pronto para testar.",
    origin: typeof window === "undefined" ? "" : window.location.origin,
    clientId: getGoogleClientId(),
    credentialPreview: "",
    apiMessage: "",
  });

  async function handleTest() {
    const origin = window.location.origin;
    const clientId = getGoogleClientId();

    setState({
      step: "loading_google",
      message: "Abrindo Google Identity Services...",
      origin,
      clientId,
      credentialPreview: "",
      apiMessage: "",
    });

    try {
      const credential = await requestGoogleCredential();

      setState((current) => ({
        ...current,
        step: "credential_received",
        message: "Google respondeu com uma credential.",
        credentialPreview: maskCredential(credential),
      }));

      setState((current) => ({
        ...current,
        step: "sending_api",
        message: "Enviando credential para a API...",
      }));

      const result = await submitGoogleLogin(credential);

      if (!result.ok) {
        setState((current) => ({
          ...current,
          step: "error",
          message: "A API recusou o login Google.",
          apiMessage: result.message,
        }));
        return;
      }

      setState((current) => ({
        ...current,
        step: "success",
        message: "Login Google concluido com sucesso.",
        apiMessage: result.message,
      }));
    } catch (error) {
      setState((current) => ({
        ...current,
        step: "error",
        message: error instanceof Error ? error.message : "Falha inesperada ao testar o login Google.",
      }));
    }
  }

  return (
    <AppScreen className="flex flex-col gap-6 py-8">
      <section className="space-y-4">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary-strong">Diagnostico Google</p>
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Teste do login Google</h1>
          <p className="text-sm text-muted">
            Esta tela mostra onde o fluxo falha: navegador, Google Identity Services ou API.
          </p>
        </div>
      </section>

      <section className="rounded-[28px] border border-border bg-white p-4 shadow-[0_18px_40px_rgba(13,44,84,0.08)]">
        <div className="space-y-3 text-sm text-foreground">
          <p><strong>Etapa:</strong> {state.step}</p>
          <p><strong>Mensagem:</strong> {state.message}</p>
          <p><strong>Origin:</strong> {state.origin || "(indisponivel)"}</p>
          <p><strong>Client ID:</strong> {maskClientId(state.clientId)}</p>
          <p><strong>Credential:</strong> {state.credentialPreview || "(nao recebida)"}</p>
          <p><strong>API:</strong> {state.apiMessage || "(sem resposta ainda)"}</p>
        </div>
      </section>

      <section className="space-y-3">
        <PrimaryButton onClick={handleTest}>Testar login Google</PrimaryButton>
        <PrimaryButton href="/login" variant="ghost">Voltar para login</PrimaryButton>
        <Link href="/login" className="text-center text-sm font-medium text-primary-strong underline underline-offset-4">
          Abrir tela normal
        </Link>
      </section>
    </AppScreen>
  );
}
