<template>
  <span class="go-back">
    <button @click="goBack" class="btn btn-warning rounded-pill">
      <i class="fas fa-arrow-left"></i> Regresar
    </button>
  </span>
</template>
<script>
export default {
  methods: {
    goBack() {
      return this.$router.go(-1);
    }
  }
};
</script>
