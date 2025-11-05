<template>
    <container-custom>
        <div class="d-flex w-full justify-space-between">
            <h1>Produtos</h1>
            <v-btn color="secondary" append-icon="$plus" :to="{ name: 'new-product' }">Novo</v-btn>
        </div>
        <v-data-table :headers="headers" :items="products">
            <template v-slot:item.actions="{ item }">
                <v-btn class="mr-3" size="small" color="secondary" icon="mdi-pencil-box-multiple"
                    @click="handleEdit(item.id)"> </v-btn>
                <v-btn size="small" color="error" icon="mdi-trash-can" @click="handleDelete(item)"> </v-btn>
                <v-dialog v-model="dialog" width="auto">
                    <v-card max-width="400" prepend-icon="mdi-trash-can"
                        :text="`Deseja realmente deletar o produto ${itemToDelete}`" title="Deletar">
                        <template v-slot:actions>
                            <v-btn color="secondary" text="Não" @click="dialog = false"></v-btn>
                            <v-btn color="error" text="Sim" @click="dialog = false"></v-btn>
                        </template>
                    </v-card>
                </v-dialog>
            </template>
        </v-data-table>
    </container-custom>
</template>

<script setup>
import { useApi } from '@/composables/useApi'
import { useRouter } from 'vue-router'

const router = useRouter()
const api = useApi()

const dialog = ref(false)
const itemToDelete = ref('')
const products = ref([])
const headers = [
    { title: 'Nome', value: 'name', sortable: true },
    { title: 'Preço', value: 'price', sortable: false },
    { title: 'Status', value: 'status', sortable: false },
    { title: 'Ações', value: 'actions', sortable: false, width: '125px', align: 'center' },
]

async function getProducts() {
    try {
        const response = await api.get('/product')
        products.value = response.data
    } catch (error) {
        notification.error(`Erro ao adquirir os produtos. Detalhes: ${error}`, 9000)
    }
}

onMounted(async () => await getProducts())

function handleEdit(id) {
    router.push({
        name: 'new-product',
        params: {
            id: id
        }
    })
}

function handleDelete(item) {
    dialog.value = true
    itemToDelete.value = item.name
}

</script>