<template>
  <div class="layout layout-with-header">
    <!-- header -->
    <lea-header />

    <!-- content -->
    <div class="main-conn">
      <router-view></router-view>
    </div>
    
    <!-- footer -->
    <lea-footer></lea-footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "layout-full"
    };
  }
};
</script>

<style lang="scss">
@import "@/assets/scss/layout.scss";
</style>
