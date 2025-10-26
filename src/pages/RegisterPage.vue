<template>
    <v-container class="pa-0 h-100" fluid>
        <v-row no-gutters style="height: 100dvh;">
            <v-col class="d-flex align-center justify-center bg-grey-lighten-4" cols="12" md="6">
                <div class="text-center">
                    <v-img class="mx-auto mb-4" max-width="300" src="/register.svg"></v-img>
                    <h1 class="text-secondary">Contrestoque</h1>
                    <p class="text-grey-darken-1">A gestão do seu estoque em suas mãos</p>
                </div>
            </v-col>
            <v-col class="d-flex align-center justify-center" cols="12" md="6">
                <div class="pa-4 w-100" style="max-width: 400px;">
                    <v-form @submit.prevent="handleSubmit" class="d-flex flex-column ga-4" v-model="valid">
                        <div class="text-center mb-6">
                            <h1 class="text-secondary">Cadastro</h1>
                            <p class="text-grey-darken-1">Preencha seus dados para criar seu acesso</p>
                        </div>

                        <v-text-field v-model="formData.name" label="Nome" variant="outlined" type="text"
                            :rules="[rules.required, rules.lengthName]"></v-text-field>

                        <v-text-field v-model="formData.email" label="E-mail" variant="outlined" type="email"
                            :rules="[rules.required, rules.email]"></v-text-field>

                        <v-text-field v-model="formData.password" label="Senha" variant="outlined" :type="typePassword"
                            :rules="[rules.required, rules.password]" :append-inner-icon="currentIconPassword"
                            @click:append-inner="showPassword"></v-text-field>

                        <v-btn :disabled="!valid" block class="mb-3" color="secondary" size="large" type="submit">
                            Cadastrar
                        </v-btn>

                        <div class="text-center mb-3">
                            ou
                        </div>

                        <v-btn :to="{ name: 'login' }" variant="outlined" block class="mb-3" color="secondary"
                            size="large">
                            Login
                        </v-btn>
                    </v-form>
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import axios from 'axios'
import { useRouter } from 'vuetify/lib/composables/router'

const router = useRouter()

const valid = ref(false)
const currentIconPassword = ref('mdi-eye-off')
const typePassword = ref('password')
const formData = ref({
    name: '',
    email: '',
    password: ''
})

const rules = {
    required: value => !!value || 'Campo obrigatório',
    lengthName: value => value.length >= 3 || 'Nome deve ter pelo menos 3 letras',
    email: value => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return pattern.test(value) || 'E-mail inválido'
    },
    password: value => {
        if (!value) return true
        if (value.length < 6 || value.length > 12) return 'A senha deve conter entre 6 e 12 caracteres'
        if (!/[a-z]/.test(value)) return 'A senha deve conter pelo menos uma letra minúscula'
        if (!/[A-Z]/.test(value)) return 'A senha deve conter pelo menos uma letra maiúscula'
        if (!/[0-9]/.test(value)) return 'A senha deve conter pelo menos um número'
        return true
    },
}

function handleSubmit() {
    if (!valid.value) {
        alert('Formulário incompleto')
    }
    createUser()
}

async function createUser() {
    try {
        await axios.post(
            `${import.meta.env.VITE_API_URL}/user`,
            {
                ...formData.value
            }
        )
        router.push({ name: 'login' })
    } catch (error) {
        console.log('Erro ao criar usuário', error)
    }
}

function showPassword() {
    typePassword.value = typePassword.value == 'password' ? 'text' : 'password'
    currentIconPassword.value = typePassword.value == 'password' ? 'mdi-eye-off' : 'mdi-eye'
}
</script>