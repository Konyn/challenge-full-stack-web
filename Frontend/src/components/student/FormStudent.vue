<script setup lang="ts">
import type {IStudent} from "@/interfaces/IStudent";
import {useStudentsStore} from "@/stores/students";

const store = useStudentsStore();
const router = useRouter();
const route = useRoute();
const student = reactive<IStudent>({
  id: null,
  name: "",
  email: "",
  ra: "",
  cpf: "",
});

const form = ref<boolean>(false);
const loading = ref<boolean>(false);
const isEdit = ref<boolean>(false);
const submit = async () => {
  loading.value = true;
  student.cpf = student.cpf.replace(/\D/g, "");
  if (isEdit.value) {
   const res =  await store.updateStudent(student)
    if(res === 200){
      router.push("/estudantes");
    }
      loading.value = false;
    return;
  }
  await store
    .registerStudent(student)
    .then(() => {
      router.push("/estudantes");
    })
    .catch(() => {
      store.setNotification("Erro ao cadastrar estudante.", "error");
    })
    .finally(() => {
      loading.value = false;
    });
};
const errors = computed(() => store.getErrors)
const rules = {
  required: (value: string) => !!value || "Campo obrigatório.",
  nameMin: (v: string) => v.length >= 2 || "Mínimo 2 caracteres",
  email: (v: string) => validateEmail(v),
  raMin: (v: string) => v.length === 7 || "Necessario 7 digitos",
};

const areAllFieldsFilled = () => {
  return form.value = student.name !== "" && student.email !== "" && student.ra !== "" && student.cpf !== "";
}

const validateEmail = (value: string) => {
  if (errors.value?.email) {
    return errors.value.email;
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value) || "Email inválido.";
}

watch(student, () => {
  areAllFieldsFilled()
})

watchEffect(() => {
  if (isEdit.value && store.getStudent) {
    student.id = store.getStudent.id;
    student.name = store.getStudent.name;
    student.email = store.getStudent.email;
    student.ra = store.getStudent.ra;
    student.cpf = store.getStudent.cpf;
  }
  if (errors.value?.email) {
    rules.email = errors.value?.email
  }
});

onMounted(async () => {
  if ("id" in route.params) {
    isEdit.value = true;
    if (!Object.keys(store.getStudent).length) {
      await store.studentById(route.params.id);
    }
  }
});
onUnmounted(() => {
  store.setErrors({});
})
</script>

<template>
  <v-container>
    <v-row justify="center">
      <v-col
        cols="12"
        md="8"
      >
        <v-card>
          <v-card-title>
            {{ isEdit ? "Editar estudante" : "Adicionar novo estudente" }}
          </v-card-title>

          <v-card-text>
            <v-form
              @submit.prevent="submit"
            >
              <v-text-field
                v-model="student.name"
                label="Name"
                :rules="[rules.required,rules.nameMin]"
                :error-messages="errors?.name"
                required
              />

              <v-text-field
                v-model="student.email"
                label="Email"
                type="email"
                :rules="[rules.required]"
                :error-messages="errors?.email"
                required
              />

              <v-text-field
                v-model="student.ra"
                v-maska="'#######'"
                label="RA"
                :rules="[rules.required, rules.raMin]"
                :error-messages="errors?.ra"
                required
                :disabled="isEdit"
              />

              <v-text-field
                v-model="student.cpf"
                v-maska="'###.###.###-##'"
                label="CPF"
                :rules="[rules.required,rules.cpfMin]"
                :error-messages="errors?.cpf"
                required
                :disabled="isEdit"
              />

              <v-card-actions>
                <v-spacer />
                <v-btn
                  :disabled="loading"
                  color="primary"
                  variant="text"
                  @click.stop="router.push('/estudantes')"
                >
                  Cancelar
                </v-btn>
                <v-btn
                  color="secondary"
                  type="submit"
                  :disabled="!form"
                  :loading="loading"
                >
                  {{ isEdit ? "Atualizar" : "Adicionar" }}
                </v-btn>
              </v-card-actions>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
