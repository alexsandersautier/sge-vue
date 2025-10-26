<template>
    <v-container class="pa-0 h-100" fluid>
        <v-row no-gutters style="height: 100dvh;">
            <v-col class="d-flex align-center justify-center bg-grey-lighten-4" cols="12" md="6">
                <div class="text-center">
                    <v-img class="mx-auto mb-4" max-width="300" src="/warehouse.svg"></v-img>
                    <h1 class="text-secondary">Contrestoque</h1>
                    <p class="text-grey-darken-1">A gestão do seu estoque em suas mãos</p>
                </div>
            </v-col>
            <v-col class="d-flex align-center justify-center" cols="12" md="6">
                <div class="pa-4 w-100" style="max-width: 400px;">
                    <v-form @submit.prevent="" class="d-flex flex-column ga-4" v-model="valid">
                        <div class="text-center mb-6">
                            <h1 class="text-secondary">Login</h1>
                            <p class="text-grey-darken-1">Preencha seus dados para acessar o sistema</p>
                        </div>

                        <v-text-field label="E-mail" variant="outlined" type="email"
                            :rules="[rules.required, rules.email]"></v-text-field>

                        <v-text-field label="Senha" variant="outlined" :type="typePassword"
                            :rules="[rules.required, rules.password]" :append-inner-icon="currentIconPassword"
                            @click:append-inner="showPassword"></v-text-field>

                        <v-btn :to="{ name: 'home' }" :disabled="!valid" block class="mb-3" color="secondary"
                            size="large" type="submit">
                            Entrar
                        </v-btn>

                        <div class="text-center mb-3">
                            ou
                        </div>

                        <v-btn :to="{ name: 'register' }" variant="outlined" block class="mb-3" color="secondary"
                            size="large">
                            Cadastre-se
                        </v-btn>
                    </v-form>
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
const valid = ref(false)
const currentIconPassword = ref('mdi-eye-off')
const typePassword = ref('password')
const rules = {
    required: value => !!value || 'Campo obrigatório',
    email: value => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return pattern.test(value) || 'E-mail inválido'
    },
    password: value => value.length >= 6 && value.length <= 12 || 'A senha deve conter entre 6 e 12 caracteres',
}

function showPassword() {
    typePassword.value = typePassword.value == 'password' ? 'text' : 'password'
    currentIconPassword.value = typePassword.value == 'password' ? 'mdi-eye-off' : 'mdi-eye'
}
</script>