<script>
import Api from "src/helpers/Api.js";
import CourseMember from "components/CourseMembers/CourseMember.vue";

export default {
  name: "CourseMembersList",
  components: {CourseMember},
  props: ["course_id"],
  data(){
    return {
      members: [],
      showLoading: false
    }
  },
  async mounted(){
     let response = await Api.get('/getCourseMembers?course_id='+this.course_id);
     if (response.status === 200 && response.data.success){
       this.members = response.data.data.members;
     } else {
       alert(response.data.error)
     }
  },
  methods: {
    async saveState(){
      this.showLoading = true;
      let result = {};
      for (let member of this.members){
        result[member.user_id] = member.is_in_course;
      }

      let response = await Api.post('/updateCourseMembers', {
        updatedState: result,
        course_id: this.course_id,
      });
      if (response.status === 200 && response.data.success){
        alert('Сохранения успешно сохранены!');
      } else {
        alert(response.data.error)
      }

      this.showLoading = false;
    }
  }
}
</script>

<template>
  <p class="q-pa-lg text-h4">Участники курса</p>
  <template v-if="members.length>0">
    <q-list>
      <p  class="q-pl-lg text-subtitle1">Пользователи, отмеченные галочкой, имеют доступ к курсу.</p>
      <CourseMember :member="member" v-for="member in members" :key="member.user_id">
        <template #member_actions>
          <q-checkbox v-model="member.is_in_course"/>
        </template>
      </CourseMember>
    </q-list>
    <q-btn class="q-ml-lg" color="primary" @click="saveState" :loading="showLoading">Сохранить</q-btn>
  </template>
  <p v-else class="q-pl-lg">Нет пользователей для добавления</p>

</template>

<style scoped>

</style>
