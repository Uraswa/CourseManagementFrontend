<template>
  <router-view />
</template>

<script>
import { jwtDecode } from "jwt-decode";
import GlobalEventManager from "src/helpers/GlobalEventManager.js";

export default {
  name: 'App',
  mounted() {
    let accessToken = localStorage.getItem("token");

    window.em = new GlobalEventManager();

    window.em.subscribe('not_auth', -1, () => {
      localStorage.removeItem('token');
      this.$store.dispatch("setUserInfo", {user_id: 0, is_admin: false});
      this.$router.push({ path: "/login" });
    })

    let routeLoginRequired = location.pathname.includes("courses")
      || location.pathname.includes("course")
      || location.pathname.includes("courseMembers")
    ;

    if (!accessToken) {
      if (routeLoginRequired || location.pathname === "/") this.$router.push({ path: "/login" });
      return;
    }

    let decodedToken = jwtDecode(accessToken);
    if (!decodedToken || !decodedToken.user_id) {
      if (routeLoginRequired || location.pathname === "/")  this.$router.push({ path: "/login" });
      return;
    }

    let userInfo = decodedToken;

    this.$store.dispatch("setUserInfo", userInfo);
    if (location.pathname === "/") {
      this.$router.push({ path: "/courses" });
    }
  }
};
</script>
