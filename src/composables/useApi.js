import axios from 'axios'

export function useApi(baseURL) {
    const apiBaseURL = baseURL || import.meta.env.VITE_API_URL
    const keyToken = 'v-token'

    const apiClient = axios.create({
        baseURL: apiBaseURL,
        timeout: 30000,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
    })

    apiClient.interceptors.request.use(
        async(config) => {
            const token = localStorage.getItem(keyToken)
            if (token) {
                config.headers.Authorization = `Bearer ${token}`
            }

            return config
        },
        (error) => Promise.reject(error)
    )

    apiClient.interceptors.response.use(
        (response) => response,
        (error) => {
            console.error(
                'Erro na requisição',
                error.reponse?.data || error.message
            )
            return Promise.reject(error)
        }
    )

    return apiClient
}