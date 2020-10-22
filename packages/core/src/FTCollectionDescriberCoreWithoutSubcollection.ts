import type { firestore as firestoreAdmin } from 'firebase-admin';
import type { firestore as firestoreClient } from 'firebase';
import type { FTEnvironment, FTCollectionModel, FTModel } from '.';

/**
 * A stricter version of `FirebaseFirestore.FirestoreDataConverter` where
 * `RM` represents the raw model and `M` represents the main model.
 */
interface ModelConverter<E extends FTEnvironment, CM extends FTCollectionModel> {
  toFirestore: (modelObject: FTModel.Processed<CM>) => FTModel.EditableSubtype<CM>;
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
