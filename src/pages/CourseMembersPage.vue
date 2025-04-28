<script >

import CourseMembersList from "components/CourseMembers/CourseMembersList.vue";
import Api from "src/helpers/Api.js";

export default  {
  name: "CourseMembersPage",
  components: {CourseMembersList},
  data(){
    return {
      course_name: ""
    }
  },
  async mounted() {
    let response = await Api.get('/getCourseInfo?course_id='+this.$route.params.course_id);
    if (response.status === 200 && response.data.success) {
      this.course_name = response.data.data.course.name;
    } else {
      alert(response.data.error)
    }
  }
}
</script>

<template>
  <q-page>
    <div class="q-pa-md row items-start q-gutter-md">
      <q-card flat bordered style="width: 100%">
        <q-card-section>
          <q-breadcrumbs>
            <q-breadcrumbs-el to="/courses" label="Курсы" />
            <q-breadcrumbs-el :to="'/course/'+$route.params.course_id" :label="course_name" />
            <q-breadcrumbs-el label="Участники" />
          </q-breadcrumbs>
        </q-card-section>

      </q-card>
    </div>
    <CourseMembersList :course_id="$route.params.course_id"/>
  </q-page>
</template>

<style scoped>

</style>
