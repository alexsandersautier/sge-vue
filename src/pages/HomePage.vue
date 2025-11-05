<template>
    <container-custom>
        <div class="d-flex ga-4">
            <CardCustom title="Categorias" :total="totalCategories" :activeCount="totalActiveCategory"
                :inactiveCount="totalInactiveCategory" />

            <CardCustom title="Produtos" :total="totalProducts" :activeCount="totalActiveProduct"
                :inactiveCount="totalInactiveProduct" />
        </div>
    </container-custom>
</template>

<script setup>
import { useCategoryService, useProductService } from '@/services';

const categoryService = useCategoryService()
const categories = ref([])
const totalCategories = computed(() => categories.value.length)
const totalActiveCategory = computed(() => categories.value.filter(item => item.status === 'active').length)
const totalInactiveCategory = computed(() => categories.value.filter(item => item.status === 'inactive').length)

const productService = useProductService()
const products = ref([])
const totalProducts = computed(() => products.value.length)
const totalActiveProduct = computed(() => products.value.filter(item => item.status === 'active').length)
const totalInactiveProduct = computed(() => products.value.filter(item => item.status === 'inactive').length)


onMounted(async () => {
    categories.value = await categoryService.getAll()
    products.value = await productService.getAll()
})
</script>