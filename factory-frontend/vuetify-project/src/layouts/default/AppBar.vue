<template>
  <v-app-bar color="success">
    <v-app-bar-nav-icon @click="toggleDrawer" />
    <v-app-bar-title>
      <v-icon icon="mdi-flash" class="mr-2"></v-icon>
      Electra 
    </v-app-bar-title>
    <v-spacer></v-spacer>
    <v-btn icon>
      <v-icon>mdi-bell</v-icon>
    </v-btn>
    <v-btn icon>
      <v-icon>mdi-account</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script setup>
import { ref } from 'vue';

const isDrawerOpen = ref(false);

const toggleDrawer = () => {
  isDrawerOpen.value = !isDrawerOpen.value;
  // Çekmecenin açılıp kapanmasını burada kontrol edebilirsiniz
};
</script>

<style scoped>
/* İsteğe bağlı olarak stil ekleyebilirsiniz */
</style>
