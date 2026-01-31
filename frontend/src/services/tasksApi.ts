//no queremos fetch(...) repetido en cada página. asi que para eso ese file

import type { CreateTaskPayload, Task, UpdateTaskPayload } from "../types/task";

const API_URL = import.meta.env.VITE_API_URL as string;

function getErrorMessage(bodyText: string) {
  // intento parsear JSON tipo { error: "..." }, si falla usamos texto plano
  try {
    const parsed = JSON.parse(bodyText) as { error?: string };
    return parsed.error ?? bodyText;
  } catch {
    return bodyText;
  }
}

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers ?? {}),
    },
    ...options,
  });

  if (!res.ok) {
    const bodyText = await res.text();
    throw new Error(getErrorMessage(bodyText) || `HTTP ${res.status}`);
  }

  // 204 No Content no trae body
  if (res.status === 204) return undefined as T;

  // A veces un 201/200 puede venir sin body. Evitamos romper res.json()
  const text = await res.text();
  if (!text) return undefined as T;

  return JSON.parse(text) as T;
}

export async function getTasks(): Promise<Task[]> {
  return request<Task[]>("/api/tasks");
}

export async function createTask(payload: CreateTaskPayload): Promise<Task> {
  return request<Task>("/api/tasks", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function updateTask(id: string, payload: UpdateTaskPayload): Promise<Task> {
  return request<Task>(`/api/tasks/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

export async function deleteTask(id: string): Promise<void> {
  return request<void>(`/api/tasks/${id}`, { method: "DELETE" });
}
