<script>
import Api from "src/helpers/Api.js";

export default {
  name: "RegistrationPage",
  data: function () {
    return {
      email: "",
      password: "",
      firstname: "",
      surname: "",
      patronymic: "",
      error_patronymic: "",
      error_firstname: "",
      error_surname: "",
      error_email: "",
      error_password: "",
    }
  },
  methods: {
    onSubmit: async function(){
      let response = await Api.post("/createUser", {
        email: this.email,
        password: this.password,
        firstname: this.firstname,
        surname: this.surname,
        patronymic: this.patronymic,
      }, 8000);

      if (response.status === 200 && response.data.success) {
         this.$router.push("/mail-sent");
      } else if (response.status === 200 && !response.data.success) {
        this.error_patronymic = response.data.error_field === "patronymic" ? response.data.error : "";
        this.error_surname = response.data.error_field === "surname" ? response.data.error : "";
        this.error_firstname = response.data.error_field === "firstname" ? response.data.error : "";
        this.error_email = response.data.error_field === "email" ? response.data.error : "";
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
          v-model="firstname"
          label="Имя"
          :rules="[
                val => !!val || 'Введите имя',
                val => val.length < 25 || 'Имя слишком длинное'
              ]"
        />
        <p v-if="error_firstname" class="text-negative">{{error_firstname}}</p>
        <q-input
          v-model="surname"
          label="Фамилия"
          :rules="[
                val => !!val || 'Введите фамилию',
                val => val.length < 25 || 'Фамилия слишком длинная'
              ]"
        />
        <p v-if="error_surname" class="text-negative">{{error_surname}}</p>
        <q-input
          v-model="patronymic"
          label="Отчество"
          :rules="[
                val => val.length < 25 || 'Отчество слишком длинное'
              ]"
        />
        <p v-if="error_patronymic" class="text-negative">{{error_patronymic}}</p>
        <q-input
          v-model="email"
          label="Email"
          :rules="[
                val => !!val || 'Введите email',
                val => val.length < 256 || 'Email слишком длинный'
              ]"
        />
        <p v-if="error_email" class="text-negative">{{error_email}}</p>
        <q-input
          v-model="password"
          label="Пароль"
          :rules="[
                val => !!val || 'Введите пароль',
                val => val.length < 40 || 'Пароль слишком длинный'
              ]"
        />
        <p v-if="error_password" class="text-negative">{{error_password}}</p>
        <q-btn style="margin-top: 10px" label="Зарегистрироваться" type="submit" color="primary"/>
        <p style="margin-top: 10px">
          <RouterLink to="/login">Войти</RouterLink>
        </p>


      </q-form>
    </div>
  </q-page>
</template>

<style scoped>

</style>
