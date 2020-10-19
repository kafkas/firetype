import type { FTCollectionModel } from '@firetype/core';
import type { FTCollectionDescriber } from '../FTCollectionDescriber';

export class FTDocumentSnapshot<CM extends FTCollectionModel> {
  constructor(
    public core: FirebaseFirestore.DocumentSnapshot<CM['model']['raw']>,
    private readonly describer: FTCollectionDescriber<CM>
  ) {}

  public data() {
    return this.describer.converter.fromFirestore(this.core.data());
  }
}
