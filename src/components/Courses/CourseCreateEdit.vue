<script>
  import Api from "src/helpers/Api.js";

  export default {
    name: 'CourseCreateEdit',
    props: ["btn_text", "btn_color", "action", "init_course"],
    emits: ['updateCourse', 'createCourse'],
    data() {
      return {
        name: '',
        error_name: '',
        showDialog: false,
        isDataProcessing: false
      }
    },
    mounted() {
      this.initValues();
    },
    methods: {
        initValues(){
           if (this.init_course) {
             this.name = this.init_course.name;
           } else {
             this.name = '';
           }
        },
        async submitForm(){
          this.isDataProcessing = true;

          let formData = {};
          if (this.init_course) {
            formData.course_id = this.init_course.course_id;
          }

          formData.name = this.name;
          let response = await Api.post(this.action === 'create' ? '/addCourse' : '/updateCourse', formData);
          if (response.status === 200 && response.data.success) {
            if (this.action === "create") {
              this.$emit('createCourse', {
                course_id: response.data.data.course_id,
                name: this.name,
              });

            } else if (this.action === "update") {
               let updatedCourse = {...this.init_course};
               updatedCourse.name = this.name;

               this.$emit("updateCourse", updatedCourse);

            }
            this.showDialog = false;
          } else if (response.status === 200 && !response.data.success && response.data.error_field) {
            this.error_name = response.data.error_field === "name" ? response.data.error : "";
          } else {
            alert(response.data.error);
          }

          this.name = "";
          this.isDataProcessing = false;
        }
    },
    watch: {
      "init_course": function () {
         this.initValues();
      }
    }
  }
</script>

<template>
  <q-btn :color="btn_color" :label="btn_text" @click="showDialog = true; isDataProcessing = false"></q-btn>
  <q-dialog v-model="showDialog">
    <q-card style="min-width: 350px">
      <q-card-section>
        <div class="text-h6" v-if="action === 'create'">Создание курса</div>
        <div class="text-h6" v-else-if="action === 'update'">Редактирование курса</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-form @submit="submitForm">
          <q-input
            dense
            v-model="name"
            label="Название курса"
            :rules="[
               val => val.length >= 3 && val.length <= 40 || 'Название курса должно содержать минимум 3 символа и не быть больше 40 символов!'

            ]"
          />
          <p v-if="error_name" class="text-negative">{{error_name}}</p>
          <q-card-actions align="right" class="text-primary">
            <q-btn flat label="Отмена" v-close-popup />
            <q-btn type="submit" flat label="Подтвердить"  />
          </q-card-actions>
        </q-form>

      </q-card-section>


    </q-card>
  </q-dialog>
</template>

<style scoped>

</style>
