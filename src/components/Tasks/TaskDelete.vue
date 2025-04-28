<script>
import Api from "src/helpers/Api.js";

export default {
  name: "TaskDelete",
  props: ["task_id"],
  emits: ["deleteTask"],
  data(){
    return {
      showDeleteModal:false,
      processLoading: false
    }
  },
  methods: {
    async deleteTask(){
      this.processLoading = true;
      let response = await Api.post('/deleteTask', {
        task_id: this.task_id
      });
      if (response.status === 200 && response.data.success) {
        this.$emit('deleteTask');
      } else {
        alert(response.data.error);
      }
      this.processLoading = false;
    }
  }

}
</script>

<template>
  <q-btn color="red" @click="showDeleteModal = true; processLoading = false">Удалить</q-btn>
  <q-dialog v-model="showDeleteModal" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <span class="q-ml-sm">Вы уверены?</span>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Отмена" color="primary" v-close-popup />
        <q-btn flat label="Подтвердить" color="primary" @click="deleteTask" :loading="processLoading"  />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<style scoped>

</style>
