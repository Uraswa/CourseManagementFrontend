<script>
import Api from "src/helpers/Api.js";

export default {
  name: "ChangePasswordPage",
  data(){
    return {
      password: "",
      error_password: "",
    }
  },
  methods:{
    async onSubmit(){
      let response = await Api.post("/changePassword", {
        password_change_token: this.$route.params.link,
        password: this.password
      }, 8000);
      if (response.status === 200 && response.data.success) {
        let {accessToken, user_id, is_admin } = response.data.data;
        localStorage.setItem("token", accessToken);
        this.$store.dispatch("setUserInfo", {user_id, is_admin})
        this.$router.push({ path: "/courses" });
      } else if (response.status === 200 && response.data.error_field) {
        this.error_password = response.data.error_field === "password" ? response.data.error : "";
      } else {
        alert(response.data.error);
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
          v-model="password"
          label="Пароль"
          :rules="[
                val => !!val || 'Введите пароль',
                val => val.length < 40 || 'Пароль слишком длинный'
              ]"
        />
        <p v-if="error_password" class="text-negative">{{error_password}}</p>
        <q-btn style="margin-top: 10px" label="Сменить пароль" type="submit" color="primary"/>
      </q-form>
    </div>
  </q-page>
</template>

<style scoped>

</style>
