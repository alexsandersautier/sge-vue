<template>
    <v-layout>
        <v-app-bar color="secondary">
            <v-app-bar-nav-icon @click.stop="drawer = !drawer">

            </v-app-bar-nav-icon>

            <v-toolbar-title>
                SGE - Gestão de estoque
            </v-toolbar-title>

            <template v-slot:append>
                <v-btn icon="mdi-logout" @click="dialog = true"></v-btn>
            </template>
        </v-app-bar>

        <v-navigation-drawer v-model="drawer">
            <v-list>
                <v-list-item v-for="menu in items" :key="menu.title" :value="menu.value" :title="menu.title"
                    :to="{ name: menu.value }">
                </v-list-item>
            </v-list>
        </v-navigation-drawer>


        <v-dialog v-model="dialog" max-width="400">
            <v-card prepend-icon="mdi-alert-box" title="Deseja realmente sair do sistema?">
                <template v-slot:actions>
                    <v-spacer></v-spacer>
                    <v-btn color="error" @click="handleLogout">
                        Sim
                    </v-btn>
                </template>
            </v-card>
        </v-dialog>


        <v-main style="height: 100dvh; overflow: auto;">
            <router-view />
        </v-main>
    </v-layout>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter()

const drawer = ref(false)
const dialog = ref(false)

const items = ref([
    {
        title: 'Dashboard',
        value: 'home'
    }, {
        title: 'Categorias',
        value: 'category'
    }, {
        title: 'Produtos',
        value: 'product'
    }
]);

function handleLogout() {
    localStorage.removeItem('v-token')
    router.replace('/')
}
</script>