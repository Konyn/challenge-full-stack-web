<script setup lang="ts">
defineProps({
  cardText:{
    type: String,
    default: '',
    requierd: true
  },
  item:{
    type: Object,
    default: () => {}
  }
})
const dialog = ref<boolean>(false);
const closeDialog = () => {
  dialog.value = false
}
</script>
<template>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      max-width="400"
      persistent
    >
      <template #activator="{ props: activatorProps }">
        <v-btn
          v-bind="activatorProps"
          icon="mdi-delete"
          size="small"
          color="error"
          variant="text"
        />
      </template>

      <v-card
        prepend-icon="mdi-account-school"
        :text="cardText"
        title="Remover estudante"
      >
        <template #actions>
          <v-spacer />

          <v-btn @click="dialog = false">
            Cancelar
          </v-btn>

          <slot
            name="actions"
            :close="closeDialog"
          >
            <v-btn
              class="bg-red"
              @click="dialog = false"
            >
              Remover
            </v-btn>
          </slot>
        </template>
      </v-card>
    </v-dialog>
  </div>
</template>
