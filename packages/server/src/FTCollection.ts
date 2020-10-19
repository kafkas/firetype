import type { FTCollectionModel } from '@firetype/core';
import type { FTCollectionDescriber } from './FTCollectionDescriber';
import FTDocument from './FTDocument';

export default class FTCollection<CM extends FTCollectionModel> {
  public readonly core: FirebaseFirestore.CollectionReference<CM['model']['processed']>;

  constructor(core: FirebaseFirestore.CollectionReference, private readonly describer: FTCollectionDescriber<CM>) {
    this.core = core.withConverter(this.describer.converter);
  }

  public doc(uid: string) {
    return new FTDocument(this.core.doc(uid), this.describer);
  }

  /**
   * A strictly typed version of the `where` query. Use this for simple queries where you
   * query fields at the root level. If you need to use `FieldPath` or some other complex
   * query with nested fields, use a raw query instead.
   */
  public where<F extends keyof CM['model']['raw'], O extends FirebaseFirestore.WhereFilterOp>(
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
