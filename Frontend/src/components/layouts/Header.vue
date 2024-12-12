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
  <div class="d-flex justify-space-between w-100">
    <div>
      <v-img
        src="../../assets/logo-grupo-a.png"
        cover
        width="100"
        aspect-ratio="16/9"
        alt="Logo"
      />
    </div>

    <v-menu>
      <template #activator="{ props }">
        <v-app-bar-nav-icon v-bind="props" />
      </template>
      <v-list>
        <v-list-item
          title="Estudantes"
          @click="navigationPage('/estudantes')"
        />
        <v-list-item
          title="Sair"
          @click="logout"
        />
      </v-list>
    </v-menu>
  </div>
</template>
