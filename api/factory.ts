import { type $Fetch, type FetchOptions } from 'ofetch';

class FetchFactory {
  private $fetch: $Fetch;

  constructor(fetcher: $Fetch) {
    this.$fetch = fetcher;
  }

  /**
   * The HTTP client is utilized to control the process of making API requests.
   * @param method the HTTP method (GET, POST, ...)
   * @param url the endpoint url
   * @param data the body data
   * @param fetchOptions fetch options
   * @returns 
   */
  async call<T>(
    method: string,
    url: string,
    data?: object,
    fetchOptions?: FetchOptions<'json'>
  ): Promise<T> {
    return this.$fetch<T>(
      url,
      {
        method,
        body: data,
        ...fetchOptions
      }
    )
  }
}

export default FetchFactory;
