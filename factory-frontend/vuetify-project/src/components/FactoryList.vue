<template>
  <v-container class="fill-height" style="background-color:aliceblue;">
    <v-responsive class="align-center text-center fill-height">
      <h2 >{{ title }}</h2>
      <!-- <v-img height="300" src="@/assets/logo.svg" /> -->
      <v-img
        src="@/assets/energy.png" 
        class="mb-3"
        style="max-width: 300px; margin: 0 auto;"
      />
      <v-row class="ga-3">
        <v-text-field v-model="newItem.id" label="id"/>
        <v-text-field v-model="newItem.name" label="name"/>
        <v-text-field v-model="newItem.startDate" label="startDate" />
      </v-row>

      <v-row class="ga-3">
        <v-text-field v-model="newItem.endDate" label="endDate"/>
        <v-text-field v-model="newItem.employeeCount" label="employeeCount"/>
        <v-text-field v-model="newItem.isFree" label="isFree"/>
      </v-row>

      <v-btn
        class="w-50 my-6"
        block rounded="xl" size="x-large"
        :disabled="!isFormValid"
        @click="addItem"
      >
        Fabrika Ekle
      </v-btn>
      <div
        class="d-flex flex-row justify-space-between my-2"
        v-for="(item, index) in factories"
        :key="index"
        :class="{ 'even-row': index % 2 === 0, 'odd-row': index % 2 !== 0 }"
      >
        <h4 class="w-20">{{ item.id }}</h4>
        <div class="w-20">{{ item.name }}</div>
        <div class="w-20">{{ item.startDate }}</div>
        <div class="w-20">{{ item.endDate }}</div>
        <div class="w-20">{{ item.employeeCount }}</div>
        <div class="w-20">{{ item.isFree }}</div>
        <v-btn @click="deleteItem(index)">
          <v-icon color="red">mdi-delete</v-icon>
        </v-btn>
        <v-btn @click="showDetails(item.id)">
          <v-icon>mdi-information-outline</v-icon>
        </v-btn>
        
        
      </div>
    </v-responsive>
  </v-container>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      factories: [
        {
          id: 1,
          name: "Korkmaz",
          startDate: "2022-03-01",
          endDate: "2023-12-31",
          employeeCount: 100,
          isFree: true,
        },
        {
          id: 2,
          name: "Arslan",
          startDate: "2000-06-12",
          endDate: "2030-05-21",
          employeeCount: 2000,
          isFree: false,
        },
        {
          id: 3,
          name: "Asya elektronik",
          startDate: "2015-09-21",
          endDate: "2025-11-01",
          employeeCount: 250,
          isFree: false,
        },
        {
          id: 4,
          name: "Derin temizlik",
          startDate: "2012-12-24",
          endDate: "2050-12-31",
          employeeCount: 300,
          isFree: true,
        },
      ],
      newItem: {
        id: 0,
        name: "",
        startDate: 0,
        endDate: 0,
        employeeCount: 0,
        isFree: "",
      },
    };
  },
  computed: {
    isFormValid() {
        return (
            this.newItem.id !== 0 &&
        this.newItem.name !== "" &&
        this.newItem.startDate !== 0 &&
        this.newItem.endDate !== 0 &&
        this.newItem.employeeCount !== 0 &&
        this.newItem.isFree !== ""
        );
    },
  },
  methods: {
    addItem() {
      this.factories.push(this.newItem);
      this.clearForm();
    },

    deleteItem(index) {
      this.factories.splice(index, 1);
    },
    clearForm() {
      this.newItem = {
        id: 0,
        name: "",
        startDate: 0,
        endDate: 0,
        employeeCount: 0,
        isFree: "",
      };
    },
    showDetails(id) {
      // Fabrika detaylarına yönlendirme işlemi
      this.$router.push({ name: 'Details', params: { id } });
    },

  },
};
</script>

<style lang="scss" scoped>
.even-row {
  background-color: #33bc6e; /* veya tercih ettiğiniz herhangi bir renk */
}

.odd-row {
  background-color: #aeb416; /* veya başka bir kontrast renk */
}



</style>
