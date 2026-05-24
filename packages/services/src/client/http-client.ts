import { getServicesConfig } from "./config"

async function getErrorMessage(response: Response): Promise<string> {
    const fallbackMessage = `Request failed with status ${response.status}`
    const contentType = response.headers.get("content-type")

    if (contentType?.includes("application/json")) {
        const errorBody = (await response.json()) as { message?: string }
        if (errorBody?.message) {
            return errorBody.message
        }
        return fallbackMessage
    }

    const text = await response.text()
    return text || fallbackMessage
}

export async function get<T>(path: string): Promise<T> {
    const { apiBaseUrl } = getServicesConfig()

    const response = await fetch(`${apiBaseUrl}${path}`)

    if (!response.ok) {
        throw new Error(await getErrorMessage(response))
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
        throw new Error(await getErrorMessage(response))
    }

    return response.json() as Promise<T>
}
