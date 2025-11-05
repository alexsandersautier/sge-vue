<template>
    <v-card class="mx-auto my-8" elevation="16" max-width="344" variant="flat">
        <v-card-item>
            <v-card-title>
                {{ title }} - Total: {{ total }}
            </v-card-title>

            <v-card-subtitle>
                <v-row>
                    <v-col class="text-center">
                        <v-chip color="green" variant="flat">
                            {{ activeRecordName }}: {{ activeCount }}
                        </v-chip>
                    </v-col>
                    <v-col class="text-center">
                        <v-chip color="red" variant="flat">
                            {{ inactiveRecordName }}: {{ inactiveCount }}
                        </v-chip>
                    </v-col>
                </v-row>
            </v-card-subtitle>
        </v-card-item>
    </v-card>
</template>

<script setup>
const props = defineProps({
    title: String,
    total: Number,
    activeCount: Number,
    inactiveCount: Number,
})

const activeRecordName = computed(() => props?.title.at(-2) === 'o' ? 'Ativos' : 'Ativas')
const inactiveRecordName = computed(() => props?.title.at(-2) === 'o' ? 'Inativos' : 'Inativas')
</script>