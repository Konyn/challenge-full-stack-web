<template>
  <v-lazy>
    <v-data-table
      :loading="loading"
      :loading-text="'Carregando estudantes...'"
      items-per-page-text="Alunos por página"
      no-data-text="Nenhum aluno cadastrado"
      :page="currentPage"
      :search="searchStudent"
      :headers="headers"
      :items="tableBody"
      :items-per-page="total"
      :items-per-page-options="[5, 10, 15, 20, { title: 'Todos', value: -1 }]"
      hover
      @update:page="page"
      @update:items-per-page="itemsPerPage"
    >
      <template #item="{ item }">
        <tr>
          <td>{{ item.name }}</td>
          <td>{{ item.email }}</td>
          <td>{{ item.ra }}</td>
          <td>{{ item.cpf }}</td>
          <td>
            <div class="d-flex justify-end">
              <v-btn
                icon="mdi-pencil"
                size="small"
                color="info"
                variant="text"
                :to="`/estudante/${item.id}/editar`"
                @click="sendStudent(item)"
              />
              <Modal
                :item="item"
                :card-text="`O estudante ${item.name} sera removido da lista de estudantes. Deseja prosseguir?`"
              >
                <template #actions="{close}">
                  <v-btn
                    class="bg-red"
                    @click="deleteStudent(item.id,close)"
                  >
                    Remover
                  </v-btn>
                </template>
              </Modal>
            </div>
          </td>
        </tr>
      </template>
    </v-data-table>
  </v-lazy>
</template>
<script setup lang="ts">
import type IDataTableHeader from "@/interfaces/IDataTableHeader";
import type { IStudent } from "@/interfaces/IStudent";
import  Modal from "./Modal.vue";
import {useStudentsStore} from "@/stores/students";

const store = useStudentsStore();
const router = useRouter();
const route = useRoute();
const currentPage = ref<number>(1);
const total = ref<number>(5);
const loading = ref(true);
const searchStudent = computed(() => store.getSearch);
const tableBody = computed(() => store.getStudents);

const deleteStudent = async (id: number,fn: () => void) => {
  await store.deleteStudent(id)
  fn()
}
const page = (value: number) => {
  router.push({ query: { ...route.query,page: value } });
  // store.listStudent(value);
  currentPage.value = value
};

const itemsPerPage = (value: number) => {
  router.push({ query: { ...route.query,total: value } });
  total.value = value
};
const sendStudent = (studant: IStudent) => {
  store.setStudent(studant);
};

const headers: IDataTableHeader[] = [
  { title: "Name", key: "name", sortable: true },
  {
    title: "Email",
    key: "email",
    sortable: true,
  },
  { title: "RA", key: "ra", sortable: true },
  { title: "CPF", key: "cpf", sortable: true },
  { title: "Actions", key: "actions", sortable: false, align: "end" },
];

watchEffect(() => {
  if (tableBody.value) {
    loading.value = false;
  }
  if(route.query?.page){
    currentPage.value = Number(route.query.page)
  }else if(!route.query?.page || !route.query){
    currentPage.value = 1
  }
});

onMounted(async () => {
  if (!store.getStudents.length) {
    await store.listStudent();
    return;
  }
});
</script>
