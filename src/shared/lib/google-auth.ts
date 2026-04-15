const GOOGLE_IDENTITY_SCRIPT_URL = "https://accounts.google.com/gsi/client";

let googleScriptPromise: Promise<void> | null = null;

export interface GoogleCredentialResponse {
  credential: string;
}

interface GooglePromptNotification {
  isNotDisplayed?: () => boolean;
  isSkippedMoment?: () => boolean;
}

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: {
            client_id: string;
            callback: (response: GoogleCredentialResponse) => void;
            auto_select?: boolean;
            cancel_on_tap_outside?: boolean;
            use_fedcm_for_prompt?: boolean;
          }) => void;
          prompt: (listener?: (notification: GooglePromptNotification) => void) => void;
          cancel: () => void;
        };
      };
    };
  }
}

export function getGoogleClientId() {
  return process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID?.trim() || "";
}

export function loadGoogleIdentityScript() {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("Login com Google indisponível no servidor."));
  }

  if (window.google?.accounts?.id) {
    return Promise.resolve();
  }

  if (googleScriptPromise) {
    return googleScriptPromise;
  }

  googleScriptPromise = new Promise<void>((resolve, reject) => {
    const existingScript = document.querySelector<HTMLScriptElement>(`script[src="${GOOGLE_IDENTITY_SCRIPT_URL}"]`);
    if (existingScript) {
      existingScript.addEventListener("load", () => resolve(), { once: true });
      existingScript.addEventListener("error", () => reject(new Error("Não foi possível carregar o login do Google.")), { once: true });
      return;
    }

    const script = document.createElement("script");
    script.src = GOOGLE_IDENTITY_SCRIPT_URL;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Não foi possível carregar o login do Google."));
    document.head.appendChild(script);
  });

  return googleScriptPromise;
}

export async function requestGoogleCredential() {
  const clientId = getGoogleClientId();
  if (!clientId) {
    throw new Error("Defina NEXT_PUBLIC_GOOGLE_CLIENT_ID para habilitar o login com Google.");
  }

  await loadGoogleIdentityScript();

  const googleIdentity = window.google?.accounts?.id;
  if (!googleIdentity) {
    throw new Error("Login com Google indisponível neste navegador.");
  }

  return new Promise<string>((resolve, reject) => {
    let settled = false;

    googleIdentity.initialize({
      client_id: clientId,
      auto_select: false,
      cancel_on_tap_outside: true,
      use_fedcm_for_prompt: true,
      callback: (response) => {
        if (settled) return;
        settled = true;

        if (!response.credential) {
          reject(new Error("O Google não retornou uma credencial válida."));
          return;
        }

        resolve(response.credential);
      },
    });

    googleIdentity.prompt((notification) => {
      if (settled) return;

      const notDisplayed = typeof notification.isNotDisplayed === "function" && notification.isNotDisplayed();
      const skipped = typeof notification.isSkippedMoment === "function" && notification.isSkippedMoment();

      if (!notDisplayed && !skipped) {
        return;
      }

      settled = true;
      reject(new Error("Não foi possível abrir o login do Google. Verifique o domínio configurado e tente novamente."));
    });
  });
}
