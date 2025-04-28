<script>
  import Api from "src/helpers/Api.js";
  import CourseComponent from "components/Courses/CourseComponent.vue";
  import CourseCreateEdit from "components/Courses/CourseCreateEdit.vue";
  import CourseDelete from "components/Courses/CourseDelete.vue";

  export default {
    name: "CoursesList",
    components: {CourseDelete, CourseCreateEdit, CourseComponent},
    data(){
      return {
          courses: []
      }
    },
    async mounted() {
      let res = await Api.get('/getCourses');
      if (res.status == 200 && res.data.success) {
        this.courses = res.data.data.courses;
      } else {
        alert(res.data.error);
      }
    },
    methods: {
      updateCourse(course){
        let courseIndex = this.courses.findIndex(c => c.course_id === course.course_id);
        if (courseIndex >= 0) {
          this.courses[courseIndex] = course;
        }
      },
      deleteCourse(course_id) {
        let courseIndex = this.courses.findIndex(c => c.course_id === course_id);
        if (courseIndex >= 0) {
          this.courses.splice(courseIndex, 1);
        }
      }
    }

  }
</script>

<template>
  <div>
    <CourseCreateEdit v-if="$store.state.is_admin" @createCourse="(course) => this.courses.push(course)" btn_color="primary" btn_text="Новый курс" action="create"/>
    <template v-if="courses.length > 0">
      <CourseComponent :course="course" v-for="course in courses" :key="course.course_id">
        <template #actions v-if="$store.state.is_admin">
          <CourseCreateEdit @updateCourse="updateCourse" :init_course="course"  btn_color="warning" btn_text="Редактировать" action="update"/>

          <CourseDelete :course_id="course.course_id" @deleteCourse="deleteCourse"/>
        </template>
      </CourseComponent>
    </template>
    <div class="flex flex-center">
      Список ваших курсов пуст
    </div>

  </div>
</template>

<style scoped>

</style>
