import type { firestore as firestoreAdmin } from 'firebase-admin';
import type { firestore as firestoreClient } from 'firebase';
import type { FTEnvironment, FTCollectionModel, FTRawModel, FTProcessedModel, EditableFields } from '.';

/**
 * A stricter version of `FirebaseFirestore.FirestoreDataConverter` where
 * `RM` represents the raw model and `M` represents the main model.
 */
interface ModelConverter<E extends FTEnvironment, CM extends FTCollectionModel> {
  toFirestore: (modelObject: FTProcessedModel<CM>) => EditableFields<CM>;
  fromFirestore: E extends 'client'
    ? (
        snapshot: firestoreClient.QueryDocumentSnapshot<FTRawModel<CM>>,
        options: firestoreClient.SnapshotOptions
      ) => FTProcessedModel<CM>
    : (snapshot: firestoreAdmin.QueryDocumentSnapshot<FTRawModel<CM>>) => FTProcessedModel<CM>;
}

export interface FTCollectionDescriberCoreWithoutSubcollection<E extends FTEnvironment, CM extends FTCollectionModel> {
  converter: ModelConverter<E, CM>;
}
