import type { firestore as firestoreAdmin } from 'firebase-admin';
import type { firestore as firestoreClient } from 'firebase';
import type { FTCollectionModel, FTModel, FTEnvironment } from '..';

export abstract class FTCollectionReferenceCore<E extends FTEnvironment, CM extends FTCollectionModel> {
  public abstract readonly core: E extends 'client'
    ? firestoreClient.CollectionReference<FTModel.Processed<CM>>
    : firestoreAdmin.CollectionReference<FTModel.Processed<CM>>;

  /**
   * A strictly typed version of the `where` query. Use this for simple queries where you
   * query fields at the root level. If you need to use `FieldPath` or some other complex
   * query with nested fields, use a raw query instead.
   */
  public where<
    F extends keyof FTModel.Raw<CM>,
    O extends E extends 'client' ? firestoreClient.WhereFilterOp : FirebaseFirestore.WhereFilterOp
  >(
    field: F,
    opStr: O,
    value: O extends 'array-contains'
      ? FTModel.Raw<CM>[F] extends unknown[]
        ? FTModel.Raw<CM>[F][number]
        : never
      : O extends 'in'
      ? FTModel.Raw<CM>[F][]
      : FTModel.Raw<CM>[F]
  ) {
    return this.core.where(<string>field, opStr, value) as E extends 'client'
      ? firestoreClient.Query<FTModel.Processed<CM>>
      : FirebaseFirestore.Query<FTModel.Processed<CM>>;
  }
}
