import type { FTEnvironment, FTCollectionModel, FTModel } from '.';
import type { QueryDocumentSnapshot, SetOptions, SnapshotOptions } from './firestore/types';

/**
 * A stricter version of `FirebaseFirestore.FirestoreDataConverter` where
 * `RM` represents the raw model and `M` represents the main model.
 */
interface ModelConverter<E extends FTEnvironment, CM extends FTCollectionModel> {
  toFirestore: {
    /**
     * The converter used in set() without merge and add() methods.
     */
    set: (modelObject: FTModel.Processed<CM>) => FTModel.LegalOutgoingSetData<E, CM>;
    /**
     * The converter used in set() with merge.
     */
    setMerge: (
      modelObject: Partial<FTModel.Processed<CM>>,
      options: SetOptions<E>
    ) => FTModel.LegalOutgoingUpdateData<E, CM>;
  };
  fromFirestore: E extends 'client'
    ? (snapshot: QueryDocumentSnapshot<E, FTModel.Raw<CM>>, options: SnapshotOptions<E>) => FTModel.Processed<CM>
    : (snapshot: QueryDocumentSnapshot<E, FTModel.Raw<CM>>) => FTModel.Processed<CM>;
}

export interface SetConverter<E extends FTEnvironment, CM extends FTCollectionModel> {
  fromFirestore: ModelConverter<E, CM>['fromFirestore'];
  toFirestore: ModelConverter<E, CM>['toFirestore']['set'];
}

export interface SetMergeConverter<E extends FTEnvironment, CM extends FTCollectionModel> {
  fromFirestore: ModelConverter<E, CM>['fromFirestore'];
  toFirestore: ModelConverter<E, CM>['toFirestore']['setMerge'];
}

export interface FTCollectionDescriberCoreWithoutSubcollection<E extends FTEnvironment, CM extends FTCollectionModel> {
  converter: ModelConverter<E, CM>;
}
