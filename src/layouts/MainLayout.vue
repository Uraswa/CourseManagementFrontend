<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <div style="display: flex; flex-direction: row;">
        <div  v-if="$store.state.user_id !== 0" style="min-height: 100vh; display: flex; align-items: flex-end" class="bg-blue">
          <div style="position: sticky; bottom: 0; left: 0">
            <q-btn @click="logout" round color="primary" icon="logout" />
          </div>
        </div>
        <div style="width: 100%">
          <router-view />
        </div>
      </div>


    </q-page-container>
  </q-layout>
</template>

<script>

import Api from "src/helpers/Api.js";

export default {
  name: "MainLayout",
  methods: {
    async logout(){
      let response = await Api.post('/logout', {}, 8000);
      if (response.status === 200){
        this.$store.dispatch("setUserInfo", {user_id: 0});
        localStorage.removeItem("token");
        this.$router.push({ path: "/login" });
      }
    }
  }

}
</script>
