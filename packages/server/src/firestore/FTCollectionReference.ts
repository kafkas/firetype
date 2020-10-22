import { FTCollectionReferenceCore, FTCollectionModel, FTModel } from '@firetype/core';
import type { FTCollectionDescriber } from '../FTCollectionDescriber';
import { FTDocumentReference } from '.';

export class FTCollectionReference<CM extends FTCollectionModel> extends FTCollectionReferenceCore<'server', CM> {
  constructor(
    public readonly core: FirebaseFirestore.CollectionReference<FTModel.Processed<CM>>,
    private readonly describer: FTCollectionDescriber<CM>
  ) {
    super();
    this.core = core.withConverter(this.describer.converter);
  }

  public doc(uid: string) {
    return new FTDocumentReference(this.core.doc(uid), this.describer);
  }
}
