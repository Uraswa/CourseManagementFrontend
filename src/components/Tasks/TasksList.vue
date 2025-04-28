<script >
 import Api from "src/helpers/Api.js";
 import TaskComponent from "components/Tasks/TaskComponent.vue";
 import TaskStatusChanger from "components/Tasks/TaskStatusChanger.vue";
 import TaskCreateEdit from "components/Tasks/TaskCreateEdit.vue";
 import TaskDelete from "components/Tasks/TaskDelete.vue";
 import TaskOutdatedExcelDownload from "components/Tasks/TaskOutdatedExcelDownload.vue";
 import CourseTaskListDownloader from "components/Tasks/CourseTaskListDownloader.vue";

 export default {
   name: 'TasksList',
   components: {
     CourseTaskListDownloader,
     TaskOutdatedExcelDownload, TaskDelete, TaskCreateEdit, TaskStatusChanger, TaskComponent},
   props: ["course_id"],
   data() {
     return {
       tasks: [],
       filter_status: {
         value: "",
         label: "Все"
       },
       sorting: {
         deadline: {
           label: "В порядке создания",
           value: ""
         }
       },
       sorting_deadline_options: [
         {
           label: "В порядке создания",
           value: ""
         },
         {
           label: "Дедлайн ближе всего",
           value: "asc"
         },
         {
           label: "Дедлайн дальше всего",
           value: "desc"
         }
       ],
       status_options: [
         {
           label:"Все",
           value: ""
         },
         {
           label: "Не начато",
           value: 0
         },
         {
           label: "В процессе",
           value: 1
         },
         {
           label: "Готово",
           value: 2
         }
       ]
     }
   },
   async mounted() {
     let response = await Api.get('getTasks?course_id='+this.course_id);
     if (response.status === 200 && response.data.success) {
       this.tasks = response.data.data.tasks;
     }
   },
   methods: {
     async changedStatus(task_id, status){
        let taskIndex = this.tasks.findIndex(t => t.task_id === task_id);

        if (taskIndex !== -1){
          let task = this.tasks[taskIndex];
          task.status = status;
          this.tasks[taskIndex] = task;
        }
     },
     async updateTask(task){
       let taskIndex = this.tasks.findIndex(t => t.task_id === task.task_id);
       if (taskIndex !== -1){
         this.tasks[taskIndex] = task;
       }
     },
     async removeTask(task_id){
       let taskIndex = this.tasks.findIndex(t => t.task_id === task_id);
       if (taskIndex !== -1){
         this.tasks.splice(taskIndex, 1);
       }
     }
   },
   computed: {
     filteredTasks(){
       let filter_status = this.filter_status.value;
       let filtered = this.tasks.filter(task => filter_status === "" || task.status === filter_status);
       for (let task of filtered) {
         task.deadline_as_date = new Date(task.deadline);
       }
       let sorting_deadline = this.sorting.deadline.value;
       if (sorting_deadline !== ""){


         filtered = filtered.sort((a,b) => {

           let res = 228;
           if (sorting_deadline === "asc") {

             if (a.deadline_as_date < b.deadline_as_date) res =  -1;
             else if (a.deadline_as_date > b.deadline_as_date) res = 1;
             else res = 0

           } else {

             if (a.deadline_as_date < b.deadline_as_date) res =  1;
             else if (a.deadline_as_date > b.deadline_as_date) res = -1;
             else res = 0

           }

           return res;
         })
       }
       return filtered;
     }
   }
 }
</script>

<template>
  <div>

      <div class="q-pa-md row items-start q-gutter-md">
        <q-card flat bordered style="width: 100%">
          <q-card-section>
            <TaskCreateEdit
              action="create"
              btn_color="primary"
              btn_text="Новое задание"
              v-if="$store.state.is_admin"
              :course_id="course_id"
              @createTask="task => this.tasks.push(task)"
            />
            <CourseTaskListDownloader v-if="!$store.state.is_admin" :tasks="tasks"/>
            <q-select v-model="filter_status" :options="status_options" label="Фильтр"></q-select>
            <q-select v-model="sorting.deadline" :options="sorting_deadline_options" label="Сортировка"></q-select>
          </q-card-section>
        </q-card>
      </div>

      <template v-if="filteredTasks.length !== 0">
        <TaskComponent :task="task" v-for="task in filteredTasks" :key="task.task_id">
          <template #task_actions>
            <TaskStatusChanger v-if="!$store.state.is_admin" :task_id="task.task_id" @status_changed="(status) => {

              changedStatus(task.task_id, status)
            }"/>
            <TaskCreateEdit
              v-if="$store.state.is_admin"
              btn_text="Редактировать"
              btn_color="warning"
              :init_task="task"
              action="update"
              @updateTask="updateTask"
            />
            <TaskDelete v-if="$store.state.is_admin" :task_id="task.task_id" @delete-task="removeTask(task.task_id)"/>

          </template>
          <template #outdated_actions>
            <TaskOutdatedExcelDownload v-if="$store.state.is_admin" :task_id="task.task_id"/>
          </template>
        </TaskComponent>
      </template>
      <div v-else class="flex flex-center">
        Заданий не найдено
      </div>
  </div>
</template>

<style scoped>

</style>
