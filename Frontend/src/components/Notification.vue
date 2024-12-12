<script setup lang="ts">
import {useNotificationStore} from "@/stores/notifications";

const store = useNotificationStore()
const notification = ref<boolean>(false)
const notificationForm = computed(() => store.getNotification)
watchEffect(() => {
  notification.value = store.getNotification.show
})
</script>

<template>
  <v-container>
    <v-banner
      v-if="notification"
      :color="notificationForm.type === 'success' ? 'secondary' : 'primary'"
      icon="mdi-account-school"
      lines="one"
    >
      <v-banner-text>
        {{ notificationForm.message }}
      </v-banner-text>

      <template #actions>
        <v-btn @click="notification = false">
          Fechar
        </v-btn>
      </template>
    </v-banner>
  </v-container>
</template>

<style scoped>

</style>
