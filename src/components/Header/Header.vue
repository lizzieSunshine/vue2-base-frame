<template>
  <div id="header" ref="header" class="lea-header adapt-header-height">
    <div class="adapt-header-height header-wrapper" :class="{ 'is-fixed': isFixed }">
      <div class="view-width">
        <logo></logo> Header
      </div>
    </div>
    <div v-if="isFixed" class="placeholder adapt-header-height"></div>
  </div>
</template>

<script>
import Logo from '@/components/Logo/';

export default {
  props: {
    isFixed: {
      type: Boolean,
      default: true
    }
  },
  components: {
    logo: Logo
  }
};
</script>

<style lang="scss">
@import "./header.scss";
</style>
