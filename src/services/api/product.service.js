import { useBaseService } from "./base.service";

export function useProductService() {
    const baseService = useBaseService('/product')

    return {
        ...baseService
    }
}