import { FTDocumentReferenceCore, FTCollectionModel } from '@firetype/core';
import { hasSubcollection } from '../_utils/describers';
import type { FTCollectionDescriber } from '../FTCollectionDescriber';
import { FTCollectionReference } from '.';

export class FTDocumentReference<CM extends FTCollectionModel> extends FTDocumentReferenceCore<'server', CM> {
  constructor(
    public readonly core: FirebaseFirestore.DocumentReference<CM['model']['processed']>,
    private readonly describer: FTCollectionDescriber<CM>
  ) {
    super();
  }

  public collection<K extends keyof CM['sub']>(key: K) {
    if (!hasSubcollection(this.describer)) {
      throw new Error('Subcollection does not exist according to the describer.');
    }

    return new FTCollectionReference<NonNullable<CM['sub']>[K]>(
      this.core.collection(key as string),
      this.describer.sub[key]
    );
  }

  public update(data: Partial<CM['model']['raw']>) {
    return this.core.update(data);
  }
}
