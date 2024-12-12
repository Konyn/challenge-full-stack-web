<template>
  <v-sheet class="pa-12 h-100 d-flex align-center bg-grey-lighten-4">
    <v-card
      class="mx-auto elevation-16 px-6 py-8 w-100 rounded-lg"
      max-width="344"
    >
      <div class="d-flex justify-center">
        <div>
          <v-img
            :width="150"
            aspect-ratio="16/9"
            cover
            src="../assets/logo-grupo-a.png"
            alt="Logo"
          />
        </div>
      </div>
      <v-form
        v-model="form"
        @submit.prevent="submit"
      >
        <v-text-field
          v-model="dataform.email"
          :readonly="loading"
          :rules="[required]"
          class="mb-2"
          label="Email"
          clearable
        />

        <v-text-field
          v-model="dataform.password"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="[rules.min]"
          :type="showPassword ? 'text' : 'password'"
          :readonly="loading"
          label="Senha"
          @click:append="showPassword = !showPassword"
        />

        <br>

        <v-btn
          :disabled="!form"
          :loading="loading"
          color="primary"
          size="large"
          type="submit"
          variant="elevated"
          block
        >
          Entrar
        </v-btn>
      </v-form>
    </v-card>
  </v-sheet>
</template>
<route lang="yaml">
meta:
  layout: auth
</route>
<script setup lang="ts">
import router from "@/router";
import {useAuthStore} from "@/stores/auth";

const store = useAuthStore();
const showPassword = ref(false);
const form = ref(false);
const loading = ref(false);
const dataform = reactive({
  email: "",
  password: "",
});
const rules = {
  required: (value: string) => !!value || "Requerido.",
  min: (v: string) => (v.length < 8 ? "Min 8 caracteres" : true),
};

const submit = async () => {
  if (!form.value) return;
  loading.value = true;
  await store.setUser(dataform);
  if (store.getUser?.token) {
    return router.push("/estudantes");
  }
  loading.value = false;
};
const required = (v: string) => {
  return !!v || "Campo requirido";
};
</script>
