import type { firestore as firestoreAdmin } from 'firebase-admin';
import type { firestore as firestoreClient } from 'firebase';
import type { FTCollectionModel, FTEnvironment } from '..';

export abstract class FTCollectionReferenceCore<E extends FTEnvironment, CM extends FTCollectionModel> {
  public abstract readonly core: E extends 'client'
    ? firestoreClient.CollectionReference<CM['model']['processed']>
    : firestoreAdmin.CollectionReference<CM['model']['processed']>;

  /**
   * A strictly typed version of the `where` query. Use this for simple queries where you
   * query fields at the root level. If you need to use `FieldPath` or some other complex
   * query with nested fields, use a raw query instead.
   */
  public where<
    F extends keyof CM['model']['raw'],
    O extends E extends 'client' ? firestoreClient.WhereFilterOp : FirebaseFirestore.WhereFilterOp
  >(
    field: F,
    opStr: O,
    value: O extends 'array-contains'
      ? CM['model']['raw'][F] extends unknown[]
        ? CM['model']['raw'][F][number]
        : never
      : O extends 'in'
      ? CM['model']['raw'][F][]
      : CM['model']['raw'][F]
  ) {
    return this.core.where(<string>field, opStr, value);
  }
}
