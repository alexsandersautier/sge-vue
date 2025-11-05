<template>
    <v-select v-model="model" :label="props.label" :items="items" variant="outlined" item-title="name" item-value="id"
        :rules="props.rules"></v-select>
</template>

<script setup>
import { useApi } from '@/composables/useApi';
import { useNotification } from '@/composables/useNotification';

const api = useApi()
const notification = useNotification()

const props = defineProps({
    resource: String,
    label: String,
    rules: Array
})

const model = defineModel({ required: true })

const items = ref([])

async function getItems() {
    try {
        const response = await api.get(`${props.resource}/`)
        items.value = response.data
    } catch (error) {
        notification.error(`Erro ao buscar ${props.label}. Detalhes: ${error}`)
    }
}

onMounted(() => getItems())
</script>