import { useApi } from "@/composables/useApi";

export function useBaseService(resource) {
    const api = useApi()

    async function getAll() {
        const response = await api.get(resource)
        return response.data
    }

    async function getById(id) {
        const response = await api.get(`${resource}/${id}`)
        return response.data
    }

    async function create(payload) {
        const response = await api.post(resource, payload)
        return response.data
    }

    async function update(id, payload) {
        const response = await api.put(`${resource}/${id}`, payload)
        return response.data
    }

    async function remove(id) {
        const response = await api.delete(`${resource}/${id}`)
        return response.data
    }

    return {
        getAll,
        getById,
        create,
        update,
        remove
    }
}