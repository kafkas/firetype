import type { firestore as firestoreAdmin } from 'firebase-admin';
import type { firestore as firestoreClient } from 'firebase';
import type { FTEnvironment, FTCollectionModel, FTModel } from '.';

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
      options: E extends 'client' ? firestoreClient.SetOptions : FirebaseFirestore.SetOptions
    ) => FTModel.LegalOutgoingUpdateData<E, CM>;
  };
  fromFirestore: E extends 'client'
    ? (
        snapshot: firestoreClient.QueryDocumentSnapshot<FTModel.Raw<CM>>,
        options: firestoreClient.SnapshotOptions
      ) => FTModel.Processed<CM>
    : (snapshot: firestoreAdmin.QueryDocumentSnapshot<FTModel.Raw<CM>>) => FTModel.Processed<CM>;
}

export interface FTCollectionDescriberCoreWithoutSubcollection<E extends FTEnvironment, CM extends FTCollectionModel> {
  converter: ModelConverter<E, CM>;
}
