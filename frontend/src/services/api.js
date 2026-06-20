const API_URL = import.meta.env.VITE_API_URL

export async function getHealthStatus() {
  const response = await fetch(`${API_URL}/api/health`)
  return response.json()
}

export async function getDashboardData() {
  const response = await fetch(`${API_URL}/api/dashboard`)
  return response.json()
}