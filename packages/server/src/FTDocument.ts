import type { FTCollectionModel } from '@firetype/core';
import type { FTCollectionDescriber } from './FTCollectionDescriber';
import FTCollection from './FTCollection';
import { hasSubcollection } from './_utils/describers';

export default class FTDocument<CM extends FTCollectionModel> {
  constructor(
    public readonly core: FirebaseFirestore.DocumentReference<CM['model']['processed']>,
    private readonly describer: FTCollectionDescriber<CM>
  ) {}

  public collection<K extends keyof CM['sub']>(key: K) {
    if (!hasSubcollection(this.describer)) {
      throw new Error('Subcollection does not exist according to the describer.');
    }

    return new FTCollection<NonNullable<CM['sub']>[K]>(this.core.collection(key as string), this.describer.sub[key]);
  }

  public update(data: Partial<CM['model']['raw']>) {
    return this.core.update(data);
  }
}
