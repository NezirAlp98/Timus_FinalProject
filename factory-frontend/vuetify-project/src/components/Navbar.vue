<template>
  <v-app-bar app>
    <v-toolbar-title>{{ $t("navbar.home") }}</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn @click="changeLanguage('tr')">TR</v-btn>
    <v-btn @click="changeLanguage('en')">EN</v-btn>
  </v-app-bar>
</template>

<script>
export default {
  methods: {
    changeLanguage(language) {
      this.$i18n.locale = language;
    },
  },
};
</script>
