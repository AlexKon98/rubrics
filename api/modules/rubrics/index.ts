import FetchFactory from '../../factory';
import type { RubricItem } from './types';

class RubricsModule extends FetchFactory {
  async getRubrics() {
    return await this.call<Promise<Array<RubricItem>>>('GET', '/yindex.php/v3/event/rubrics?allowEmpty=1');
  }
}

export default RubricsModule;
