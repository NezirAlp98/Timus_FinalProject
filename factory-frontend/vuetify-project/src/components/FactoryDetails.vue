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
          <v-text-field v-model="newItem.usingUnit" label="usingUnit"/>
          <v-text-field v-model="newItem.dateRange" label="dateRange" />
        </v-row>
  
        <v-row class="ga-3">
          <v-text-field v-model="newItem.usageKW" label="usageKW"/>
          <v-text-field v-model="newItem.usagePrice" label="usagePrice"/>
          <v-text-field v-model="newItem.isDiscounted" label="isDiscounted"/>
        </v-row>
  
        <v-btn
          class="w-50 my-6"
          block rounded="xl" size="x-large"
          :disabled="!isFormValid"
          @click="addItem"
        >
          Detay Ekle
        </v-btn>
        <div
          class="d-flex flex-row justify-space-between my-2"
          v-for="(item, index) in details"
          :key="index"
          :class="{ 'even-row': index % 2 === 0, 'odd-row': index % 2 !== 0 }"
        >
          <h4 class="w-20">{{ item.id }}</h4>
          <div class="w-20">{{ item.usingUnit }}</div>
          <div class="w-20">{{ item.dateRange }}</div>
          <div class="w-20">{{ item.usageKW }}</div>
          <div class="w-20">{{ item.usagePrice }}</div>
          <div class="w-20">{{ item.isDiscounted }}</div>
          <v-btn @click="deleteItem(index)">
            <v-icon color="red">mdi-delete</v-icon>
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
        details: [
          {
            id: 1,
            usingUnit: "Engineer",
            dateRange: "2022-03-01 - 2023-12-31",
            usageKW: 100,
            usagePrice: 1000,
            isDiscounted: true,
          },
          {
            id: 2,
            usingUnit: "Electric",
            dateRange: "2000-06-12 - 2030-05-21",
            usageKW: 500,
            usagePrice: 2500,
            isDiscounted: false,
          },
          {
            id: 3,
            usingUnit: "Secretary",
            dateRange: "2015-09-21 - 2025-11-01",
            usageKW: 25000,
            usagePrice: 20000,
            isDiscounted: true,
          },
          {
            id: 4,
            usingUnit: "Technician",
            dateRange: "2012-12-24 - 2050-12-31",
            usageKW: 600,
            usagePrice: 12000,
            isDiscounted: false,
          },
        ],
        newItem: {
          id: 0,
          usingUnit: 0,
          dateRange: "",
          usageKW: 0,
          usagePrice: 0,
          isDiscounted: "",
        },
      };
    },
    computed: {
    isFormValid() {
      // Tüm alanlar doldurulmuş mu kontrolü
      return (
        this.newItem.id !== 0 &&
        this.newItem.usingUnit !== "" &&
        this.newItem.dateRange !== "" &&
        this.newItem.usageKW !== 0 &&
        this.newItem.usagePrice !== 0 &&
        this.newItem.isDiscounted !== ""
      );
    },
  },
    methods: {
      addItem() {
        this.details.push(this.newItem);
        this.clearForm();
      },
  
      deleteItem(index) {
        this.details.splice(index, 1);
      },
      clearForm() {
        this.newItem = {
            id: 0,
          usingUnit: 0,
          dateRange: "",
          usageKW: 0,
          usagePrice: 0,
          isDiscounted: "",
        };
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
  