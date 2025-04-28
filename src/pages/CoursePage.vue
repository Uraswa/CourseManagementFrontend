<script setup>

import TasksList from "components/Tasks/TasksList.vue";
import TaskCreateEdit from "components/Tasks/TaskCreateEdit.vue";
</script>

<template>
  <q-page>

      <TasksList :course_id="$route.params.course_id"/>
  </q-page>
</template>

<style scoped>

</style>
