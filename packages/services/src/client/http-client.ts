import { getServicesConfig } from "./config"

export async function get<T>(path: string): Promise<T> {
    const { apiBaseUrl } = getServicesConfig()

    const response = await fetch(`${apiBaseUrl}${path}`)

    if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`)
    }

    return response.json() as Promise<T>
}

export async function post<T, B>(path: string, body: B): Promise<T> {
    const { apiBaseUrl } = getServicesConfig()

    const response = await fetch(`${apiBaseUrl}${path}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    })

    if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`)
    }

    return response.json() as Promise<T>
}
