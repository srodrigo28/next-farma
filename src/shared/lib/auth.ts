import { apiGet } from "@/shared/lib/api";

const ACCESS_TOKEN_KEY = "next-farma.access-token";
const CURRENT_USER_KEY = "next-farma.current-user";

export interface AuthUser {
  id: number;
  name: string;
  email: string;
  phone?: string | null;
  coren?: string | null;
  cep?: string | null;
  street?: string | null;
  number?: string | null;
  neighborhood?: string | null;
  city?: string | null;
  state?: string | null;
  complement?: string | null;
  professional_profile?: string | null;
  work_context?: string | null;
  primary_unit?: string | null;
}

export interface AuthSession {
  accessToken: string;
  user: AuthUser;
}

export function saveAuthSession(accessToken: string, user: AuthUser) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  window.localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
}

export function getAuthSession(): AuthSession | null {
  if (typeof window === "undefined") return null;

  const accessToken = window.localStorage.getItem(ACCESS_TOKEN_KEY);
  const userJson = window.localStorage.getItem(CURRENT_USER_KEY);
  if (!accessToken || !userJson) {
    return null;
  }

  try {
    const user = JSON.parse(userJson) as AuthUser;
    if (!user?.email || !user?.name) {
      clearAuthSession();
      return null;
    }

    return {
      accessToken,
      user,
    };
  } catch {
    clearAuthSession();
    return null;
  }
}

export function needsProfileCompletion(user: AuthUser | null | undefined) {
  if (!user) return false;

  return [user.name, user.phone, user.cep, user.street, user.number, user.neighborhood, user.city, user.state].some(
    (value) => !String(value || "").trim(),
  );
}

export async function validateAuthSession() {
  const session = getAuthSession();
  if (!session) {
    return null;
  }

  const payload = await apiGet<AuthUser>("/api/v1/auth/me", undefined, true);
  if (!payload) {
    clearAuthSession();
    return null;
  }

  saveAuthSession(session.accessToken, payload.data);
  return {
    accessToken: session.accessToken,
    user: payload.data,
  } satisfies AuthSession;
}

export function clearAuthSession() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(ACCESS_TOKEN_KEY);
  window.localStorage.removeItem(CURRENT_USER_KEY);
}

