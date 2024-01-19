<template>
  <v-row>
    <v-col cols="12" lg="2">
      <side-bar @send-response="getData"></side-bar>
    </v-col>
    <v-col class="flex flex-col items-center pa-10">
      <main-chart :data="data"></main-chart>
    </v-col>
  </v-row>
</template>
<script setup>
const data = ref([])

const getData = (items) => {
  data.value = items
}
</script>