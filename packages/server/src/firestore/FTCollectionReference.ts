import { FTCollectionReferenceCore, FTCollectionModel } from '@firetype/core';
import type { FTCollectionDescriber } from '../FTCollectionDescriber';
import { FTDocumentReference } from '.';

export class FTCollectionReference<CM extends FTCollectionModel> extends FTCollectionReferenceCore<'server', CM> {
  constructor(
    public readonly core: FirebaseFirestore.CollectionReference<CM['model']['processed']>,
    private readonly describer: FTCollectionDescriber<CM>
  ) {
    super();
    this.core = core.withConverter(this.describer.converter);
  }

  public doc(uid: string) {
    return new FTDocumentReference(this.core.doc(uid), this.describer);
  }
}
