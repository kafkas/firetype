import { FTCollectionReferenceCore, FTCollectionModel } from '@firetype/core';
import type { FTCollectionDescriber } from '../FTCollectionDescriber';
import { FTDocumentReference } from '.';

export class FTCollectionReference<CM extends FTCollectionModel> extends FTCollectionReferenceCore<'server', CM> {
  constructor(
    public readonly core: FirebaseFirestore.CollectionReference,
    public readonly describer: FTCollectionDescriber<CM>
  ) {
    super();
  }

  public doc(uid: string) {
    return new FTDocumentReference(this, uid);
  }
}
