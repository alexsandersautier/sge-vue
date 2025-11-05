<template>
    <container-custom>
        <div class="d-flex w-full justify-space-between">
            <h1>Categorias</h1>
            <v-btn color="secondary" append-icon="$plus" :to="{ name: 'new-category' }">Nova</v-btn>
        </div>
        <v-data-table :headers="headers" :items="categories" items-per-page-text="Por página"
            :items-per-page-options="footerOptions">
            <template v-slot:item.status="{ item }">
                <ChipCustom :value="item.status" />
            </template>
            <template v-slot:item.actions="{ item }">
                <v-btn class="mr-3" size="small" color="secondary" icon="mdi-pencil-box-multiple"
                    @click="handleEdit(item.id)"> </v-btn>
                <v-btn size="small" color="error" icon="mdi-trash-can" @click="handleDelete(item)"> </v-btn>
                <v-dialog v-model="dialog" width="auto">
                    <v-card max-width="400" prepend-icon="mdi-trash-can"
                        :text="`Deseja realmente deletar a categoria ${itemToDelete}`" title="Deletar">
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
import { useCategoryService } from '@/services/api'
import { useRouter } from 'vue-router'

const router = useRouter()
const service = useCategoryService()

const dialog = ref(false)
const itemToDelete = ref('')
const categories = ref([])
const headers = [
    { title: 'Nome', value: 'name', sortable: true },
    { title: 'Status', value: 'status', sortable: false },
    { title: 'Ações', value: 'actions', sortable: false, width: '125px', align: 'center' },
]
const footerOptions = [
    { value: 10, title: '10' },
    { value: 25, title: '25' },
    { value: 50, title: '50' },
    { value: 100, title: '100' },
    { value: -1, title: 'Todos' }
]

async function getCategories() {
    try {
        categories.value = await service.getAll()
    } catch (error) {
        notification.error(`Erro ao adquirir as categorias. Detalhes: ${error}`, 9000)
    }
}

onMounted(async () => await getCategories())

function handleEdit(id) {
    router.push({
        name: 'new-category',
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