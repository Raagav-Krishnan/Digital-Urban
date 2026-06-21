const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000'

export async function getHealthStatus() {
  const response = await fetch(`${API_URL}/api/health`)
  return response.json()
}

export async function getDashboardData() {
  const response = await fetch(`${API_URL}/api/dashboard`)
  return response.json()
}
