<template>
  <div id="app">
    <NavigationGlobal />
    <router-view :key="$route.path" />
    <FooterGlobal />
  </div>
</template>

<script>
import NavigationGlobal from "@/components/NavigationGlobal.vue";
import FooterGlobal from "@/components/FooterGlobal.vue";

export default {
  components: {
    NavigationGlobal,
    FooterGlobal
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
