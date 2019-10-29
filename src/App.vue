<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  methods: {
 
  },

  created() {
    // 在页面加载时读取sessionStorage
    if (!this.$store.state.userinfo) {
      if (localStorage.getItem("admin-godper.com-store")) {
        this.$store.replaceState(
          Object.assign(
            {},
            this.$store.state,
            JSON.parse(localStorage.getItem("admin-godper.com-store"))
          )
        );
      }
    }
    // 在页面刷新时将store保存到sessionStorage里
    window.addEventListener("beforeunload", () => {
      localStorage.setItem(
        "admin-godper.com-store",
        JSON.stringify(this.$store.state)
      );
    });
  }
};
</script>
<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
a {
  text-decoration: none;
  color: #333;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
