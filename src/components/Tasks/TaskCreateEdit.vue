<script>
import Api from "src/helpers/Api.js";
import moment from "moment";

export default {
  name: "TaskCreateEdit",
  props: ["btn_text", "btn_color", "action", "init_task", "course_id"],
  emits: ['updateTask', 'createTask'],
  data() {
    return {
      showCreateEditForm: false,
      showDeadlineDialog: false,
      showLoading: false,
      name: "",
      text: "",
      deadline: new Date(),
      error_name: "",
      error_text: "",
      error_deadline: ""
    }
  },
  mounted() {
    this.updateDataVals();
  },
  methods: {
    updateDataVals(){

      if (!this.init_task){
        this.name = "";
        this.text = "";
        this.deadline = new Date().toString();
      } else {
        this.name = this.init_task.name;
        this.text = this.init_task.text;
        this.deadline = moment(this.init_task.deadline).local().format("YYYY-MM-DD HH:mm");
      }
    },
    async submitForm(){
      this.showLoading = true;
      let formData = {

      };

      if (this.init_task){
        formData.task_id = this.init_task.task_id;
      }

      formData.name = this.name;
      formData.text = this.text;
      formData.deadline = new Date(this.deadline).getTime();
      formData.course_id = this.course_id;

      let response = await Api.post(this.action === "create" ? "/addTask" : "/updateTask", formData);
      if (response.status === 200 && response.data.success) {
        if (this.action === "create") {
          this.$emit('createTask', {
            task_id: response.data.data.task_id,
            text: this.text,
            deadline: this.deadline,
            name: this.name
          })
        } else if (this.action === "update") {
          let updateTask = {...this.init_task};
          updateTask.text = this.text;
          updateTask.deadline = this.deadline;
          updateTask.name = this.name;

          this.$emit('updateTask', updateTask)
        }
        this.showCreateEditForm = false;
      } else if (response.status === 200 && !response.data.success && response.data.error_field) {
         this.error_name = response.data.error_field === "name" ? response.data.error : "";
         this.error_text = response.data.error_field === "text" ? response.data.error : "";
         this.error_deadline = response.data.error_field === "deadline" ? response.data.error : "";

      } else {
        alert(response.data.error)
      }
      this.showLoading = false;
    }
  },
  watch: {
    "init_task"(){
      this.updateDataVals();
    }
  }
}
</script>

<template>
  <q-btn @click="showCreateEditForm = true; showLoading = false" :color="btn_color">{{btn_text}}</q-btn>
  <q-dialog v-model="showCreateEditForm">
    <q-card style="min-width: 350px">
      <q-card-section>
        <div class="text-h6" v-if="action === 'create'">Создание задания</div>
        <div class="text-h6" v-else-if="action === 'update'">Редактирование задания</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-form @submit="submitForm">
          <q-input
            dense
            v-model="name"
            label="Название задания"
            :rules="[
               val => val.length >= 3 && val.length <= 256 || 'Название задачи должно содержать минимум 3 символа и не быть больше 256 символов!'

            ]"
          />
          <p v-if="error_name" class="text-negative">{{error_name}}</p>
          <q-input
            dense
            v-model="text"
            type="textarea"
            label="Описание задания"
            :rules="[
               val => val.length >= 10 && val.length <= 5000 || 'Описание задачи должно содержать минимум 10 символов и не быть больше 5000 символов'
            ]"
          />

          <q-btn style="margin-top: 15px" color="primary" label="Дедлайн" @click="showDeadlineDialog = true"></q-btn>
          <q-dialog v-model="showDeadlineDialog">
            <q-date
              v-model="deadline"
              minimal
              mask="YYYY-MM-DD HH:mm"
            />
            <q-time :format24h="true" v-model="deadline"  mask="YYYY-MM-DD HH:mm"/>
          </q-dialog>



          <p v-if="error_deadline" class="text-negative">{{error_deadline}}</p>
          <q-card-actions align="right" class="text-primary">
            <q-btn flat label="Отмена" v-close-popup />
            <q-btn type="submit" flat label="Подтвердить" :loading="showLoading" />
          </q-card-actions>
        </q-form>

      </q-card-section>


    </q-card>
  </q-dialog>
</template>

<style scoped>

</style>
