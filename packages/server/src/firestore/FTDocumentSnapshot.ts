import type { FTCollectionModel, FTModel } from '@firetype/core';
import type { FTCollectionDescriber } from '../FTCollectionDescriber';

export class FTDocumentSnapshot<CM extends FTCollectionModel> {
  private static hasCreateTime<M>(
    snapshot: FirebaseFirestore.DocumentSnapshot<M> | FirebaseFirestore.QueryDocumentSnapshot<M>
  ): snapshot is FirebaseFirestore.QueryDocumentSnapshot<M> {
    return snapshot.createTime !== undefined;
  }

  constructor(
    public core: FirebaseFirestore.DocumentSnapshot<FTModel.Raw<CM>>,
    private readonly describer: FTCollectionDescriber<CM>
  ) {}

  /**
   * Checks whether the snapshot contains a `createTime`. If yes, uses the converter in the describer
   * to return the document data as a model object. Otherwise, returns `undefined` (this happens when
   * the document does not exist).
   *
   * Note: We need to carry out this check due to the type mismatch between `QueryDocumentSnapshot`
   * and `DocumentSnapshot`. If you aren't happy with this method, you can always use `.core.data()`
   * to read the document data.
   */
  public data() {
    return FTDocumentSnapshot.hasCreateTime(this.core) ? this.describer.converter.fromFirestore(this.core) : undefined;
  }
}
