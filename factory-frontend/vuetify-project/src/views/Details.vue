<template>
    <FactoryDetails :id="$route.params.id" title="Fabrika Detayları" />
  </template>
  
  <script>
  import FactoryDetails from "@/components/FactoryDetails.vue";
  
  export default {
    components: { 
      FactoryDetails: FactoryDetails 
  },
  };
  </script>