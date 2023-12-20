<template>
  <v-card class="mx-auto mt-10" max-width="344" title="Kullanıcı girişi">
    <v-container>
      <v-text-field
        v-model="first"
        :rules="nameRule"
        color="primary"
        label="İsim"
        variant="underlined"
      ></v-text-field>

      <v-text-field
        v-model="email"
        :rules="emailRule"
        color="primary"
        label="Email"
        variant="underlined"
      ></v-text-field>

      <v-text-field
        v-model="password"
        :rules="passwordRule"
        color="primary"
        label="Şifre"
        placeholder="Şifrenizi giriniz"
        variant="underlined"
        :type="passwordVisible ? 'text' : 'password'"
      ></v-text-field>

      <v-text-field
        v-model="last"
        color="primary"
        label="Yetki"
        variant="underlined"
      ></v-text-field>

      <v-checkbox
        v-model="terms"
        color="secondary"
        label="Sözleşmeyi kabul ediyorum."
      ></v-checkbox>

      <v-checkbox
        v-model="rememberMe"
        color="secondary"
        label="Beni Hatırla"
      ></v-checkbox>
    </v-container>

    <v-divider></v-divider>

    <v-card-actions>
      <v-spacer></v-spacer>

      <v-btn color="success" @click="completeLogin">
        Complete Login

        <v-icon icon="mdi-chevron-right" end></v-icon>
      </v-btn>
    </v-card-actions>
    <v-alert v-if="showAlert" type="error" border="left" colored>
      Lütfen tüm alanları doldurun ve şartları kabul edin.
    </v-alert>
  </v-card>
</template>
<script>
export default {
  data: () => ({
    first: null,
    last: null,
    email: null,
    password: null,
    terms: false,
    rememberMe: false,
    showAlert: false,
    alertMessage: "",
    nameRule: [
      (v) => !!v || "İsim zorunludur",
      (v) => (v && v.length >= 8) || "İsim en az 8 karakter olmalıdır",
    ],
    emailRule: [
      (v) => !!v || "E-posta zorunludur",
      (v) => /.+@.+\..+/.test(v) || "Geçerli bir e-posta adresi giriniz",
    ],
    passwordRule: [
      (v) => !!v || "Şifre zorunludur",
      (v) => (v && v.length >= 8) || "Şifre en az 8 karakter olmalıdır",
      (v) => /[A-Z]/.test(v) || "Şifre en az 1 büyük harf içermelidir",
      (v) => /\d/.test(v) || "Şifre en az 1 numeric karakter içermelidir",
    ],
  }),
  mounted() {
    this.retrieveSavedCredentials();
  },
  methods: {
    completeLogin() {
      const isNameValid = this.nameRule.every(
        (rule) => rule(this.first) === true
      );
      const isEmailValid = this.emailRule.every(
        (rule) => rule(this.email) === true
      );
      const isPasswordValid = this.passwordRule.every(
        (rule) => rule(this.password) === true
      );
      if (
        this.first &&
        this.last &&
        this.email &&
        this.password &&
        this.terms &&
        this.isValidRole(this.last)
      ) {
        if (isNameValid && isEmailValid && isPasswordValid) {
            this.$router.push("/factory");

        if (this.rememberMe) {
          this.saveCredentials();
        }
      } else {
        this.showAlert = true;
        this.alertMessage = "Lütfen tüm alanları doldurun ve geçerli değerler girin.";
      }

      } else {
        this.showAlert = true;
        this.alertMessage = this.isValidRole(this.last)
          ? "Lütfen tüm alanları doldurun ve şartları kabul edin."
          : 'Geçersiz yetki. Sadece "admin" veya "editor" yetkileri kabul edilir.';
      }
    },
    isValidRole(role) {
      return role === "admin" || role === "editor";
    },

    saveCredentials() {
      const userToSave = {
        first: this.first,
        last: this.last,
        email: this.email,
        password: this.password,
      };
      localStorage.setItem("rememberedUser", JSON.stringify(userToSave));
    },
    retrieveSavedCredentials() {
      if (this.rememberMe && localStorage.getItem("rememberedUser")) {
        const savedUser = JSON.parse(localStorage.getItem("rememberedUser"));
        this.first = savedUser.first;
        this.last = savedUser.last;
        this.email = savedUser.email;
        this.password = savedUser.password;
      }
    },
  },
};
</script>
