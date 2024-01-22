<template>
  <v-dialog v-model="openUpload">
    <modal-upload @send-response="getData" @close-modal="eventModal"></modal-upload>
  </v-dialog>
  <!-- <v-dialog v-model="openTutorial">
    <modal-upload @send-response="getData" @close-modal="eventModal"></modal-upload>
  </v-dialog> -->
  <v-row>
    <v-col class="flex flex-col items-center pa-10">
      <main-chart :data="data" @open-modal="eventModal"></main-chart>
    </v-col>
  </v-row>
</template>
<script setup>
const data = ref([])
const openUpload = ref(true)
const openTutorial = ref(false)

const getData = (items) => {
  data.value = items
}

function eventModal(event) {
  return openUpload.value = event
}
</script>