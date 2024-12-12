<script setup lang="ts">
import { useRouter, useRoute } from "vue-router";
import { ref, onMounted } from "vue";
import {useStudentsStore} from "@/stores/students";

const router = useRouter();
const route = useRoute();
const message = ref<string>("");
const store = useStudentsStore();

const search = () => {
  store.setSearch(message.value);
  const query = { ...route.query };
  if (!message.value) {
    delete query.busca;
  } else {
    query.busca = message.value;
  }
  router.push({ query });
};

onMounted(() => {
  if (route.query.busca) {
    message.value = route.query.busca.toString();
    search();
  }
});
</script>

<template>
  <v-container class="px-0">
    <v-form class="h-100">
      <v-row>
        <v-col
          cols="12"
          md="8"
        >
          <v-text-field
            v-model="message"
            clear-icon="mdi-close-circle"
            label="Digite sua busca"
            type="text"
            variant="filled"
            clearable
          />
        </v-col>
        <v-col
          cols="12"
          md="4"
        >
          <v-row
            class="h-100"
            style="min-height: 70px"
          >
            <v-col cols="6">
              <v-btn
                class="h-100 w-100"
                @click="search"
              >
                Pesquisar Aluno
              </v-btn>
            </v-col>
            <v-col cols="6">
              <v-btn
                class="h-100 w-100"
                @click="router.push('/estudante/cadastro')"
              >
                Cadastrar Aluno
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-form>
    <div class="mt-10 mt-lg-6">
      <v-card>
        <Table />
      </v-card>
    </div>
  </v-container>
</template>
<route lang="yaml">
meta:
  layout: default
</route>
