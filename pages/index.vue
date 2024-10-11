<template>
  <div class="main">
    <section class="main__rubrics">
      <div class="container">
        <h1 class="main__title">Rubrics</h1>

        <label for="allow" class="main__label" v-if="rubrics.isInitialized">
          <input type="checkbox" name="allow" id="allow" :value="rubrics.isAllowEmpty" @change="rubrics.changeVisibility">
          <span>Change allow</span>
        </label>

        <RecursiveList v-if="rubrics.isInitialized" :rubrics="rubrics.rubrics" />

        <div v-else>
          Fetching rubrics...
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
import RecursiveList from '~/components/MainPage/RecursiveList.vue';

const rubrics = useRubrics();
</script>

<style lang="scss" >
.main {
  margin: 30px 0;

  &__title {
    margin-bottom: 15px;
  }

  &__label {
    width: fit-content;
    cursor: pointer;
    display: flex;
    align-items: center;
    margin-bottom: 15px;

    span {
      padding-left: 5px;
    }
  }
}
</style>
