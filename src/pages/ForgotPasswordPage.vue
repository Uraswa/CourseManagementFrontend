<script>
import Api from "src/helpers/Api.js";

export default {
  name: "ForgotPasswordPage",
  data: function () {
    return {
      email: "",
      hasErrors: true
    }
  },
  methods: {
    async onSubmit(){
      let response = await Api.post('/forgotPassword', {
        email: this.email
      }, 8000);
      if (response.status === 200 && response.data.success) {
        this.$router.push("/mail-sent");
      } else {
        alert(response.data.error)
      }
    },
  },
}
</script>

<template>
  <q-page>
    <div style="height: 100vh; width: 100%; display: flex; justify-content: center; align-items: center;">
      <q-form
        style="min-width: 320px"
        @submit="onSubmit"
        class="q-gutter-md"
      >
        <q-input
          v-model="email"
          label="Email"
          :rules="[
                val => !!val || 'Введите email',
                val => val.length < 256 || 'Email слишком длинный'
              ]"
        />
        <q-btn style="margin-top: 10px" label="Восстановить" type="submit" color="primary"/>
        <p style="margin-top: 10px">
          <RouterLink to="/registration">Регистрация</RouterLink>
        </p>
        <p>
          <RouterLink to="/login">Войти</RouterLink>
        </p>
      </q-form>

    </div>
  </q-page>
</template>

<style scoped>

</style>
