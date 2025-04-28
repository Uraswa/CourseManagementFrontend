<script>
import Api from "src/helpers/Api.js";

export default {
  name: "LoginPage",
  data: function () {
    return {
      email: "",
      password: ""
    }
  },
  methods: {
    onSubmit: async function(){
      let response = await Api.post("/login", {
        email: this.email,
        password: this.password,
      }, 8000);

      if (response.status === 200 && response.data.success) {
        let {accessToken, user_id, is_admin } = response.data.data;
        localStorage.setItem("token", accessToken);
        this.$store.dispatch("setUserInfo", {user_id, is_admin})
        this.$router.push({ path: "/courses" });
      } else {
        alert(response.data.error)
      }

    }

  }
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
            <q-input
              v-model="password"
              label="Пароль"
              :rules="[
                val => !!val || 'Введите пароль',
                val => val.length < 40 || 'Пароль слишком длинный'
              ]"
            />
            <q-btn style="margin-top: 10px" label="Войти" type="submit" color="primary"/>
            <p style="margin-top: 10px">
              <RouterLink to="/registration">Регистрация</RouterLink>
            </p>
            <p>
              <RouterLink to="/forgotPassword">Забыли пароль?</RouterLink>
            </p>


          </q-form>
        </div>
      </q-page>


</template>

<style scoped>

</style>
