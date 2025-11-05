import { useBaseService } from "./base.service";

export function useCategoryService() {
    const baseService = useBaseService('/category')

    return {
        ...baseService
    }
}