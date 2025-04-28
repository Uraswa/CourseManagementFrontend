<script>
import Api from "src/helpers/Api.js";

export default {
  name: "AccountActivationPage",
  async mounted() {
    let response = await Api.get("/activateAccount?activation_link="+this.$route.params.link, 8000)
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
</script>

<template>
  <q-page>
      Активация... {{$route.params.link}}
  </q-page>
</template>

<style scoped>

</style>
