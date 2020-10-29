import type { firestore as firestoreAdmin } from 'firebase-admin';
import type { firestore as firestoreClient } from 'firebase';
import type {
  FTCollectionModel,
  FTCollectionDescriberCore,
  FTModel,
  FTEnvironment,
  SetConverter,
  SetMergeConverter,
} from '..';

type SetType = 'set' | 'setMerge';

type WithConverter<E extends FTEnvironment, CM extends FTCollectionModel, TP extends SetType> = (
  converter: TP extends 'set' ? SetConverter<E, CM> : SetMergeConverter<E, CM>
) => E extends 'client'
  ? firestoreClient.CollectionReference<FTModel.Processed<CM>>
  : firestoreAdmin.CollectionReference<FTModel.Processed<CM>>;

export abstract class FTCollectionReferenceCore<E extends FTEnvironment, CM extends FTCollectionModel> {
  public abstract readonly core: E extends 'client'
    ? firestoreClient.CollectionReference
    : firestoreAdmin.CollectionReference;

  public abstract readonly describer: FTCollectionDescriberCore<E, CM>;

  /**
   * Applies one of the 2 converters provided in the describer to this collection.
   * @param toFirestoreConverterType Either `"set"` or `"setMerge"`.
   * @returns A `CollectionReference` to which a specified converter is applied.
   */
  public coreWithConverter<ST extends SetType>(toFirestoreConverterType: ST) {
    // We need this assertion to prevent "Incompatible call signature" error.
    // See https://github.com/microsoft/TypeScript/issues/7294
    return ((this.core.withConverter as unknown) as WithConverter<E, CM, ST>)({
      fromFirestore: this.describer.converter.fromFirestore,
      toFirestore: this.describer.converter.toFirestore[toFirestoreConverterType],
    } as ST extends 'set' ? SetConverter<E, CM> : SetMergeConverter<E, CM>);
  }

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
    return this.coreWithConverter('set').where(<string>field, opStr, value) as E extends 'client'
      ? firestoreClient.Query<FTModel.Processed<CM>>
      : FirebaseFirestore.Query<FTModel.Processed<CM>>;
  }
}
