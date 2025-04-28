<script >
  import moment from "moment";

  export default {
    name: 'TaskComponent',
    props: ["task"],
    computed: {
      dateToRender(){
        return moment(this.task.deadline_as_date).local().format('YYYY-MM-DD HH:mm')
      }
    }
  }
</script>

<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <q-card class="my-card" flat bordered style="width: 100%">
      <q-card-section horizontal>
        <q-card-section class="q-pt-xs">
          <div class="text-overline">Задание
            <q-badge color="green" v-if="task.status == 2">
              Готово
            </q-badge>
            <q-badge color="blue" v-else-if="task.status == 1">
              В процессе
            </q-badge>
            <q-badge color="warning" v-else>
              Не начато
            </q-badge>
          </div>
          <div class="text-h5 q-mt-sm q-mb-xs">{{task.name}}</div>
          <div class="text-caption text-grey">
            {{task.text}}
          </div>
        </q-card-section>

      </q-card-section>

      <q-separator />

      <q-card-actions>
        <q-btn flat round icon="event" />
        <q-btn flat>
          До: {{dateToRender}}
        </q-btn>
        <slot name="task_actions"></slot>
      </q-card-actions>
    </q-card>

  </div>
</template>

<style scoped>

</style>
