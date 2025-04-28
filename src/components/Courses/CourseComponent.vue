<script>
  export default {
    name: "Course",
    props: ["course"]
  }
</script>

<template>
  <div class="q-pa-md row items-start q-gutter-md" style="width: 100%;">
    <q-card class="my-card" flat bordered style="width: 100%;">

      <q-card-section>

        <div class="text-h5 q-mt-sm q-mb-xs">{{course.name}}</div>

      </q-card-section>

      <q-card-actions>
        <q-btn :to="'/course/'+course.course_id" flat color="primary" label="Перейти" />
        <q-btn v-if="$store.state.is_admin" :to="'/courseMembers/'+course.course_id" flat color="primary" label="Участники" />
        <slot name="actions"></slot>
        <q-space />
      </q-card-actions>

    </q-card>
  </div>
</template>

<style scoped>

</style>
