import type { FTCollectionModel } from '@firetype/core';
import type { FTCollectionDescriber } from './FTCollectionDescriber';
import FTCollection from './FTCollection';

export default class FTDocument<CM extends FTCollectionModel> {
  constructor(
    public readonly core: FirebaseFirestore.DocumentReference<CM['model']['processed']>,
    private readonly describer: FTCollectionDescriber<CM>
  ) {}

  public collection<K extends keyof CM['sub']>(key: K) {
    return new FTCollection<NonNullable<CM['sub']>[K]>(
      this.core.collection(key as string),
      /* eslint-disable-next-line */
      (<any>this.describer).sub[key as string] // TODO: Remove `any` assertion
    );
  }

  public update(data: Partial<CM['model']['raw']>) {
    return this.core.update(data);
  }
}
