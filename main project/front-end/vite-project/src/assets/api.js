const BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

async function request(path, opts = {}) {
  const url = BASE + path;
  const res = await fetch(url, { credentials: 'include', headers: { 'Content-Type': 'application/json' }, ...opts });
  const data = await res.json().catch(()=>({}));
  if (!res.ok) throw data;
  return data;
}

export const auth = {
  register: (payload) => request('/auth/register', { method: 'POST', body: JSON.stringify(payload) }),
  login: (payload) => request('/auth/login', { method: 'POST', body: JSON.stringify(payload) }),
  logout: () => request('/auth/logout', { method: 'POST' })
};

export const recipes = {
  list: () => request('/recipes'),
  get: (id) => request(`/recipes/${id}`),
  create: (payload) => request('/recipes', { method: 'POST', body: JSON.stringify(payload) }),
  myList: () => request('/recipes/my/list'),
  comment: (id, payload) => request(`/recipes/${id}/comments`, { method: 'POST', body: JSON.stringify(payload) }),
  update: (id, payload) => request(`/recipes/${id}`, { method: 'PUT', body: JSON.stringify(payload) }),
  remove: (id) => request(`/recipes/${id}`, { method: 'DELETE' })
};
