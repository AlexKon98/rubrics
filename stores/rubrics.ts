import { defineStore, skipHydrate } from 'pinia';
import { ref, type Ref, watch } from 'vue';
import type { RubricItem } from '~/api/modules/rubrics/types';

const useRubricsStore = defineStore('rubrics', () => {
  const { $api } = useNuxtApp();

  const isAllowEmpty: Ref<boolean> = ref(false);

  const isInitialized: Ref<boolean> = ref(false);

  const rubrics: Ref<Array<RubricItem>> = ref([] as RubricItem[]);

  const changeVisibility = () => {
    isAllowEmpty.value = !isAllowEmpty.value;
  }

  const getRubrics = async () => {
    try {
      const res: RubricItem[] = await $api.rubrics.getRubrics();
      rubrics.value = res;
      setIsAllow(rubrics.value, isAllowEmpty.value);
      setIsOpen(rubrics.value);
    } catch (err) {
      console.log(err);
    } finally {
      isInitialized.value = true;
    }
  };

  const setIsOpen = (items: RubricItem[]) => {
    items.forEach(item => {
      item.isOpen = false;
      setIsOpen(item.children);
    });
  }

  const toggleAccordion = (item: RubricItem) => {
    item.isOpen = !item.isOpen;
  };

  const setIsAllow = (items: RubricItem[], value: boolean) => {
    items.forEach(item => {
      if (value) {
        item.isAllow = true;
        if (item.children.length) setIsAllow(item.children, true);
      } else {
        if (item.children.length) {
          item.isAllow = true;
          setIsAllow(item.children, value);
        } else {
          item.isAllow = false;
        }
      }
    });
  };

  watch(() => isAllowEmpty.value, (value) => {
    setIsAllow(rubrics.value, value);
    console.log(rubrics.value);
  }, {immediate: true})

  const initialize = async () => {
    await getRubrics();
  };

  return {
    isAllowEmpty,
    isInitialized,
    rubrics: skipHydrate(rubrics),
    getRubrics,
    changeVisibility,
    setIsAllow,
    toggleAccordion,
    initialize
  };
});

export const useRubrics = () => {
  const rubricsStore = useRubricsStore();
  if (!rubricsStore.isInitialized) rubricsStore.initialize();
  return rubricsStore;
}
