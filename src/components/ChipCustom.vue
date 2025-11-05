<template>
    <v-chip :color="color">
        {{ status }}
    </v-chip>
</template>

<script setup>
const props = defineProps({
    value: {
        type: String,
        required: true
    }
})

const color = computed(() => {
    switch (props.value) {
        case 'active':
            return 'green'
        case 'inactive':
            return 'red'
        default:
            break;
    }
})

const status = computed(() => {
    switch (props.value) {
        case 'active':
            return 'Ativo'
        case 'inactive':
            return 'Inativo'
        default:
            break;
    }
})

</script>