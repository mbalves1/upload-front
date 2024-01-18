import { defineStore } from 'pinia'
import { postFile } from '../server/api-upload'

export const useFilesStore = defineStore('file', {
  state: () => ({
    books: [],
  }),
  actions: {
    async postFile(payload) {
      const file = payload
      console.log('fikle', file)
      const formData = new FormData();
      if (payload instanceof File) {
        formData.append('file', payload);
      } else {
        console.error('Payload não é um arquivo válido');
      }
      console.log('formData', formData)

      try {
        const response = await postFile(formData)

        return response
      } catch (error) {
        throw new Error('Erro ao enviar arquivo');
      }
    }
  }
})