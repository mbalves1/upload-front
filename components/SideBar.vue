<template>
  <div class="h-100vh bg-#f2f2f2">
    <h3>Upload de arquivo</h3>
    <div class="w-200px">
      <v-file-input
        type="file"
        @change="handleFileChange"
        variant="outlined"
        append-inner-icon="mdi-file"
        prepend-icon=""
       ></v-file-input>
    </div>
    <v-btn @click="uploadFile">Eva</v-btn>
  </div>
</template>
<script setup>
const emit = defineEmits(['sendResponse'])
const { postFile } = useFilesStore()
const selectedFile = ref(null);

const handleFileChange = (event) => {
  selectedFile.value = event.target.files[0];
};

const uploadFile = async () => {
  const formData = new FormData();
  formData.append('file', selectedFile.value);
  const response = await postFile(formData)
  emit('sendResponse', response)
};

</script>