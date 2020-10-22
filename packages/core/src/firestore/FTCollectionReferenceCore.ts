import type { firestore as firestoreAdmin } from 'firebase-admin';
import type { firestore as firestoreClient } from 'firebase';
import type { FTCollectionModel, FTProcessedModel, FTRawModel, FTEnvironment } from '..';

export abstract class FTCollectionReferenceCore<E extends FTEnvironment, CM extends FTCollectionModel> {
  public abstract readonly core: E extends 'client'
    ? firestoreClient.CollectionReference<FTProcessedModel<CM>>
    : firestoreAdmin.CollectionReference<FTProcessedModel<CM>>;

  /**
   * A strictly typed version of the `where` query. Use this for simple queries where you
   * query fields at the root level. If you need to use `FieldPath` or some other complex
   * query with nested fields, use a raw query instead.
   */
  public where<
    F extends keyof FTRawModel<CM>,
    O extends E extends 'client' ? firestoreClient.WhereFilterOp : FirebaseFirestore.WhereFilterOp
  >(
    field: F,
    opStr: O,
    value: O extends 'array-contains'
      ? FTRawModel<CM>[F] extends unknown[]
        ? FTRawModel<CM>[F][number]
        : never
      : O extends 'in'
      ? FTRawModel<CM>[F][]
      : FTRawModel<CM>[F]
  ) {
    return this.core.where(<string>field, opStr, value) as E extends 'client'
      ? firestoreClient.Query<FTProcessedModel<CM>>
      : FirebaseFirestore.Query<FTProcessedModel<CM>>;
  }
}
