<script setup lang="ts">
import {useAuthStore} from "@/stores/auth";
import {useStudentsStore} from "@/stores/students";

const student = useStudentsStore();
const router = useRouter();
const logout = async () => {
  await useAuthStore()
    .logout()
    .then(() => {
      router.push("/");
    });
};
const navigationPage = (route:string) => {
  student.setSearch('')
  router.push({path:route,query:{}})
};
</script>

<template>
  <v-navigation-drawer>
    <v-list-item
      title="Gestão de alunos"
      subtitle="Painel administrativo"
    />
    <v-divider />
    <v-list-item
      link
      title="Estudantes"
      @click="navigationPage('/estudantes')"
    />
    <div class="position-absolute bottom-0 w-100">
      <v-btn
        width="100%"
        @click="logout"
      >
        <v-icon>mdi-logout</v-icon>
        <span>Sair</span>
      </v-btn>
    </div>
  </v-navigation-drawer>
</template>
