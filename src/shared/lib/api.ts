import { ApiErrorResponse, ApiResponse } from "@/shared/types/api";
import { getAuthSession } from "@/shared/lib/auth";

const DEFAULT_API_BASE_URL = "http://127.0.0.1:5000";

export function getApiBaseUrl() {
  const configuredBaseUrl = process.env.NEXT_PUBLIC_API_URL?.trim();
  return (configuredBaseUrl || DEFAULT_API_BASE_URL).replace(/\/$/, "");
}

export function createApiUrl(path: string) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${getApiBaseUrl()}${normalizedPath}`;
}

function buildHeaders(init?: RequestInit, authenticated = false) {
  const headers = new Headers(init?.headers);

  if (authenticated) {
    const session = getAuthSession();
    if (session?.accessToken) {
      headers.set("Authorization", `Bearer ${session.accessToken}`);
    }
  }

  return headers;
}

export async function apiGet<T>(
  path: string,
  init?: RequestInit,
  authenticated = false,
): Promise<ApiResponse<T> | null> {
  try {
    const response = await fetch(createApiUrl(path), {
      cache: "no-store",
      ...init,
      headers: buildHeaders(init, authenticated),
    });

    if (!response.ok) {
      return null;
    }

    return (await response.json()) as ApiResponse<T>;
  } catch {
    return null;
  }
}

export async function apiRequest<T>(
  path: string,
  init: RequestInit,
  authenticated = false,
): Promise<{ ok: true; payload: ApiResponse<T> } | { ok: false; payload: ApiErrorResponse | null }> {
  try {
    const response = await fetch(createApiUrl(path), {
      ...init,
      headers: buildHeaders(init, authenticated),
    });
    const payload = (await response.json()) as ApiResponse<T> | ApiErrorResponse;

    if (!response.ok) {
      return {
        ok: false,
        payload: payload as ApiErrorResponse,
      };
    }

    return {
      ok: true,
      payload: payload as ApiResponse<T>,
    };
  } catch {
    return {
      ok: false,
      payload: null,
    };
  }
}
