const API_URL = 'http://localhost:5000/api'

export type Design = {
  id: string
  name: string
  motif: string
  vessel: string
  palette: string
  finish: string
  prompt: string
  createdAt: string
}

export type User = { id: number; name: string; email: string }

export function getToken() {
  return localStorage.getItem('jingcraft-token')
}

export function logout() {
  localStorage.removeItem('jingcraft-token')
  localStorage.removeItem('jingcraft-user')
}

export function getSavedUser(): User | null {
  try {
    const raw = localStorage.getItem('jingcraft-user')
    return raw ? (JSON.parse(raw) as User) : null
  } catch {
    return null
  }
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getToken()
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(data.error || 'Something went wrong.')
  return data as T
}

function saveSession(data: { token: string; user: User }) {
  localStorage.setItem('jingcraft-token', data.token)
  localStorage.setItem('jingcraft-user', JSON.stringify(data.user))
  return data.user
}

export async function register(name: string, email: string, password: string) {
  const data = await request<{ token: string; user: User }>('/auth/register', {
    method: 'POST',
    body: JSON.stringify({ name, email, password }),
  })
  return saveSession(data)
}

export async function login(email: string, password: string) {
  const data = await request<{ token: string; user: User }>('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  })
  return saveSession(data)
}

export async function listDesigns() {
  return (await request<{ designs: Design[] }>('/designs')).designs
}

export async function createDesign(design: Omit<Design, 'id' | 'createdAt'>) {
  return (await request<{ design: Design }>('/designs', {
    method: 'POST',
    body: JSON.stringify(design),
  })).design
}

export async function deleteDesign(id: string) {
  await request<{ ok: boolean }>(`/designs/${id}`, { method: 'DELETE' })
}

export async function previewConcept(prompt: string) {
  return (await request<{
    suggestion: { motif: string; palette: string; finish: string; prompt: string }
  }>('/ai/preview', {
    method: 'POST',
    body: JSON.stringify({ prompt }),
  })).suggestion
}