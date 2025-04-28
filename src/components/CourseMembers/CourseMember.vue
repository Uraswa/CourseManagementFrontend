<script>
export default {
  name: "CourseMember",
  props: ["member"]
}
</script>

<template>
  <q-item tag="label" v-ripple>
    <q-item-section side top>
      <slot name="member_actions"></slot>
    </q-item-section>

    <q-item-section>
      <q-item-label>{{member.surname}} {{member.firstname}} {{member.patronymic}}</q-item-label>

    </q-item-section>
  </q-item>
</template>

<style scoped>

</style>
