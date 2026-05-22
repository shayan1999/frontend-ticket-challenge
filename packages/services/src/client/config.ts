type ServicesConfig = {
    apiBaseUrl: string
}

const config: ServicesConfig = {
    apiBaseUrl: "",
}

export function configureServices(nextConfig: ServicesConfig) {
    config.apiBaseUrl = nextConfig.apiBaseUrl
}

export function getServicesConfig() {
    return config
}
