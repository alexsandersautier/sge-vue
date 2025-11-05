<template>
    <container-custom>
        <div class="d-flex w-full justify-space-between">
            <h2>Cadastro de categorias</h2>
        </div>
        <v-form @submit.prevent="handleSubmit" class="d-flex flex-column ga-4 mt-3" v-model="valid">
            <v-text-field v-model="formData.name" label="Nome" variant="outlined" type="text"
                :rules="[rules.required]"></v-text-field>

            <v-select v-model="formData.status" label="Status" :items="options" variant="outlined" item-title="key"
                item-value="value" :rules="[rules.required]"></v-select>

            <div class="d-flex justify-end ga-6">
                <v-btn :to="{ name: 'category' }">
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

const formData = ref({
    name: '',
    status: options[0].value
})

const rules = {
    required: value => !!value || 'Campo obrigatório'
}

function handleSubmit() {
    if (!valid.value) {
        notification.error('Formulário incompleto')
    }
    createOrUpdateCategory()
}

async function createCategory() {
    try {
        await api.post('/category',
            {
                ...formData.value
            }
        )
        notification.success(`Categoria ${formData.value.name} criado com sucesso`)
        router.push({ name: 'category' })
    } catch (error) {
        notification.error(`Erro ao criar a categoria ${formData.value.name}. Detalhes: ${error}`, 9000)
    }
}

async function updateCategory(id) {
    try {
        await api.put(`/category/${id}`,
            {
                ...formData.value
            }
        )
        notification.success(`Categoria ${formData.value.name} atualizada com sucesso`)
        router.push({ name: 'category' })
    } catch (error) {
        notification.error(`Erro ao atualizar a categoria ${formData.value.name}. Detalhes: ${error}`, 9000)
    }
}

async function createOrUpdateCategory() {
    if (route.params.id) {
        await updateCategory(route.params.id)
    } else {
        await createCategory()
    }
}

onMounted(async () => {
    await getCategory()
})

async function getCategory() {
    if (route.params.id) {
        const response = await api.get(`/category/${route.params.id}`)
        formData.value = response.data
    }
}
</script>