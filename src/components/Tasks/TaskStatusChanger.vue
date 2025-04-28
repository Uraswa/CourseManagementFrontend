<script>
 import Api from "src/helpers/Api.js";

 export default {
   name: 'TaskStatusChanger',
   props: ["task_id", "task_status"],
   emits: ['status_changed'],
   data() {
     return {
       showChangeStatusDialog: false,
     }
   },
   mounted() {

   },
   methods: {
     async changeStatusTo(status){

        let response = await Api.post('/changeTaskStatus', {
          task_id: this.task_id,
          status: status
        });
        if (response.status === 200 && response.data.success) {
          this.$emit('status_changed', status);
          this.showChangeStatusDialog = false;
        } else {
          alert(response.data.error);
        }
     }
   }
 }
</script>

<template>
  <div>
    <q-btn flat color="primary" @click="showChangeStatusDialog = true">
      Сменить статус
    </q-btn>
    <q-dialog v-model="showChangeStatusDialog">
      <q-card>
        <q-list bordered separator>
          <q-item clickable v-ripple @click="changeStatusTo(0)">
            <q-item-section>Не начато</q-item-section>
          </q-item>

          <q-item clickable v-ripple @click="changeStatusTo(1)">
            <q-item-section>
              <q-item-label>В процессе</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple @click="changeStatusTo(2)">
            <q-item-section>
              <q-item-label>Готово</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card>
    </q-dialog>
  </div>
</template>

<style scoped>

</style>
