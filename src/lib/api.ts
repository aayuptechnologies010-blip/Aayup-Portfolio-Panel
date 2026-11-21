export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export function getAuthToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("aayup_admin_token");
}

export function setAuthToken(token: string): void {
  if (typeof window !== "undefined") {
    localStorage.setItem("aayup_admin_token", token);
  }
}

export function removeAuthToken(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem("aayup_admin_token");
    localStorage.removeItem("aayup_admin_user");
  }
}

export function getStoredUser(): any {
  if (typeof window === "undefined") return null;
  const user = localStorage.getItem("aayup_admin_user");
  try {
    return user ? JSON.parse(user) : null;
  } catch {
    return null;
  }
}

export async function fetchWithAuth(endpoint: string, options: RequestInit = {}) {
  const token = getAuthToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (res.status === 401 && typeof window !== "undefined") {
    removeAuthToken();
    if (!window.location.pathname.includes("/admin/login")) {
      window.location.href = "/admin/login";
    }
  }

  return res;
}
