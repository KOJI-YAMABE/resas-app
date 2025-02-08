const BASE_URL = import.meta.env.VITE_BASE_URL
const API_KEY = import.meta.env.VITE_API_KEY

export async function apiRequest<T>(path: string): Promise<T> {
    const res = await fetch(`${BASE_URL}${path}`, {
        headers: { 'X-API-KEY': API_KEY },
    })

    if (!res.ok) {
        throw new Error(`API request failed: ${path}`)
    }

    const json = await res.json()
    return json.result
}
