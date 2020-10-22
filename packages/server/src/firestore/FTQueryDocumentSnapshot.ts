import type { FTCollectionModel, FTRawModel } from '@firetype/core';
import type { FTCollectionDescriber } from '../FTCollectionDescriber';

export class FTQueryDocumentSnapshot<CM extends FTCollectionModel> {
  constructor(
    public core: FirebaseFirestore.QueryDocumentSnapshot<FTRawModel<CM>>,
    private readonly describer: FTCollectionDescriber<CM>
  ) {}

  /**
   * Uses the converter in the describer to return the document data as a model object.
   */
  public data() {
    return this.describer.converter.fromFirestore(this.core);
  }
}
