<template>
    <v-layout>
        <v-app-bar color="secondary">
            <v-app-bar-nav-icon @click.stop="drawer = !drawer">

            </v-app-bar-nav-icon>

            <v-toolbar-title>
                SGE - Gestão de estoque
            </v-toolbar-title>
        </v-app-bar>

        <v-navigation-drawer v-model="drawer">
            <v-list>
                <v-list-item v-for="menu in items" :key="menu.title" :value="menu.value" :title="menu.title"
                    :to="{ name: menu.value }">
                </v-list-item>
            </v-list>
        </v-navigation-drawer>

        <v-main style="height: 100dvh; overflow: auto;">
            <router-view />
        </v-main>
    </v-layout>
</template>

<script setup>
const drawer = ref(false);

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
</script>