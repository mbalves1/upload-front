import { defineStore } from 'pinia'
import { postFile } from '../server/api-upload'

export const useFilesStore = defineStore('file', {
  state: () => ({
    file: [],
  }),
  actions: {
    async postFile(payload) {
      try {
        const response = await postFile(payload)

        return response
      } catch (error) {
        throw new Error('Erro ao enviar arquivo');
      }
    }
  }
})