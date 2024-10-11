<template>
  <ul class="rubrics">
    <template v-for="rubric in rubrics" :key="rubric.id">
      <li v-if="rubric.isAllow">
        <div class="rubrics__toggle" @click.self="toggleAccordion(rubric)">
          <a :href="'https://www.klerk.ru' + rubric.url" target="_blank">{{ rubric.title }}</a>
          <span>{{ calculateTotalCount(rubric) }}</span>
        </div>

        <RecursiveList class="rubrics__nested" v-if="rubric.isAllow && rubric.isOpen" :rubrics="rubric.children" />
      </li>
    </template>
  </ul>
</template>

<script lang="ts" setup>
import type { RubricItem } from '~/api/modules/rubrics/types';

defineProps<{
  rubrics: RubricItem[]
}>();

const { toggleAccordion } = useRubrics();

const calculateTotalCount = (item: RubricItem) : number => {
  const childrenCount = item.children?.reduce((sum, child) => sum + calculateTotalCount(child), 0) || 0;
  return item.count + childrenCount;
};
</script>

<style lang="scss" scoped>
.rubrics {
  display: flex;
  flex-direction: column;
  gap: 10px;

  span {
    pointer-events: none;
    padding-left: 10px;
  }

  a {
    color: black;

    &:hover {
      color: blue;
    }
  }

  &__toggle {
    cursor: pointer;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 5px;
  }

  &__nested {
    padding-left: 20px;
  }
}
</style>