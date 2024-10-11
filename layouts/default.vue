<template>
  <div class="default">
    <TheHeader />

    <main>
      <slot />
    </main>

    <TheFooter />
  </div>
</template>

<script lang="ts" setup>
import TheHeader from '~/components/TheHeader.vue';
import TheFooter from '~/components/TheFooter.vue';
</script>

<style lang="scss" scoped>
.default {
  min-height: 100svh;
  display: flex;
  flex-direction: column;

  main {
    flex: 1;
  }
}
</style>
