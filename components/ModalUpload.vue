<template>
  <div class="flex mx-auto">
    <v-card class="bg-white sm:w-500px">
      <v-form ref="forms" @submit.prevent="uploadFile">
        <v-card-title>
          Upload de arquivo
        </v-card-title>
        <v-divider></v-divider>
        <div class="ma-3 mx-auto">
          <p class="text-grey ml-3 mb-5"><i>Escolha um arquivo na extensão xlsx ou csv</i></p>
          <v-file-input
            class="mx-2"
            type="file"
            @change="handleFileChange"
            variant="outlined"
            append-inner-icon="mdi-file"
            :rules="[v => !!v || 'Campo obrigatório!']"
            prepend-icon=""
            accept=".csv,.xlsx"
           ></v-file-input>
        </div>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn
            :disabled="disabled"
            size="x-large"
            type="submit"
            class="w-full capitalize"
            color="blue"
            variant="flat"
            append-icon="mdi-send">Enviar arquivo</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </div>
</template>
<script setup>
const emit = defineEmits(['sendResponse', 'closeModal'])
const { postFile } = useFilesStore()
const selectedFile = ref(null);
const disabled = ref(false)
const forms = ref(null)

const handleFileChange = (event) => {
  selectedFile.value = event.target.files[0];
};

const uploadFile = async () => {
  if (selectedFile.value === null) {
    return
  }
  const formData = new FormData();
  formData.append('file', selectedFile.value);
  try {
    const response = await postFile(formData)
    emit('sendResponse', response)
    emit('closeModal', false)
  } catch (error) {
    console.error(error);
  }
};

</script>