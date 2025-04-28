<script >
 import Api from "src/helpers/Api.js";

 export default {
   name: "CourseDelete",
   props: ["course_id"],
   emits: ["deleteCourse"],
   data(){
     return {
       showDialog: false,
       showLoading: false
     }
   },
   methods: {
     async deleteCourse(){
       this.showLoading = true;

       let response = await Api.post('/deleteCourse', {
         course_id: this.course_id,
       })

       if (response.status === 200 && response.data.success) {
         this.$emit('deleteCourse', this.course_id);
         this.showDialog = false;
       } else {
         alert(response.data.error);
       }

       this.showLoading = false;
     }
   }
 }
</script>

<template>
  <q-btn color="red" label="Удалить" @click="showDialog=true;showLoading=false"></q-btn>
  <q-dialog v-model="showDialog" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <span class="q-ml-sm">Вы уверены?</span>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Отмена" color="primary" v-close-popup />
        <q-btn flat label="Подтвердить" color="primary" @click="deleteCourse" :loading="showLoading"  />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<style scoped>

</style>
