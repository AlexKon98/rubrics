import { $fetch, type FetchOptions } from 'ofetch';

import RubricsModule from '~/api/modules/rubrics';

interface IApiInstance {
  rubrics: RubricsModule
}

export default defineNuxtPlugin(() => {
  const fetchOptions: FetchOptions = {
    baseURL: 'https://www.klerk.ru',
    // credentials: 'include',
  };

  const apiFetcher = $fetch.create(fetchOptions);

  const modules: IApiInstance = {
    rubrics: new RubricsModule(apiFetcher)
  };

  return {
    provide: {
      api: modules
    }
  };
});
