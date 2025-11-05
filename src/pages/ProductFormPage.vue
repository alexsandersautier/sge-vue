<template>
    <container-custom>
        <div class="d-flex w-full justify-space-between">
            <h2>Cadastro de produtos</h2>
        </div>
        <v-form @submit.prevent="handleSubmit" class="d-flex flex-column ga-4 mt-3" v-model="valid">
            <v-text-field v-model="formData.name" label="Nome" variant="outlined" type="text"
                :rules="[rules.required]"></v-text-field>

            <v-textarea v-model="formData.description" label="Descrição" variant="outlined" type="text"
                :rules="[rules.required]"></v-textarea>

            <div class="d-md-flex ga-4">
                <v-text-field v-model="formData.price" label="Preço" variant="outlined" type="number"
                    :rules="[rules.required]"></v-text-field>

                <v-select v-model="formData.status" label="Status" :items="options" variant="outlined" item-title="key"
                    item-value="value" :rules="[rules.required]"></v-select>

                <SelectFromApi v-model="formData.category_id" :rules="[rules.required]" :resource="'category'"
                    :label="'Categorias'" />
            </div>

            <div class="d-flex justify-end ga-6">
                <v-btn :to="{ name: 'product' }">
                    Cancelar
                </v-btn>

                <v-btn :disabled="!valid" color="secondary" type="submit">
                    Salvar
                </v-btn>
            </div>
        </v-form>
    </container-custom>
</template>


<script setup>
import { useApi } from '@/composables/useApi'
import { useNotification } from '@/composables/useNotification'
import { useRoute } from 'vue-router'
import { useRouter } from 'vuetify/lib/composables/router'

const api = useApi()
const notification = useNotification()
const router = useRouter()
const route = useRoute()

const valid = ref(false)

const options = [
    { key: 'Ativo', value: 'active' },
    { key: 'Inativo', value: 'inactive' },
]

const categories = ref([])

const formData = ref({
    name: '',
    description: '',
    price: 0,
    status: options[0].value,
    category_id: categories.value[0]
})

const rules = {
    required: value => !!value || 'Campo obrigatório'
}

async function handleSubmit() {
    if (!valid.value) {
        notification.error('Formulário incompleto')
    }
    await createOrUpdateProduct()
}

async function createProduct() {
    try {
        await api.post('/product',
            {
                ...formData.value
            }
        )
        notification.success(`Produto ${formData.value.name} criado com sucesso`)
        router.push({ name: 'product' })
    } catch (error) {
        notification.error(`Erro ao criar o produto ${formData.value.name}. Detalhes: ${error}`, 9000)
    }
}

async function updateProduct(id) {
    try {
        await api.put(`/product/${id}`,
            {
                ...formData.value
            }
        )
        notification.success(`Produto ${formData.value.name} atualizada com sucesso`)
        router.push({ name: 'product' })
    } catch (error) {
        notification.error(`Erro ao atualizar o produto ${formData.value.name}. Detalhes: ${error}`, 9000)
    }
}

async function createOrUpdateProduct() {
    if (route.params.id) {
        await updateProduct(route.params.id)
    } else {
        await createProduct()
    }
}

onMounted(async () => {
    await getCategories()
    await getProduct()
})

async function getCategories() {
    const response = await api.get(`/category`)
    categories.value = response.data
}

async function getProduct() {
    if (route.params.id) {
        const response = await api.get(`/product/${route.params.id}`)
        formData.value = response.data
    }
}
</script>