import type { firestore as firestoreAdmin } from 'firebase-admin';
import type { firestore as firestoreClient } from 'firebase';
import type { FTCollectionModel, FTEnvironment } from '..';

/**
 * A stricter version of `FirebaseFirestore.FirestoreDataConverter` where
 * `RM` represents the raw model and `M` represents the main model.
 */
interface ModelConverter<E extends FTEnvironment, CM extends FTCollectionModel> {
  toFirestore: (modelObject: CM['model']['processed']) => CM['model']['raw'];
  fromFirestore: E extends 'client'
    ? (
        snapshot: firestoreClient.QueryDocumentSnapshot<CM['model']['raw']>,
        options: firestoreClient.SnapshotOptions
      ) => CM['model']['processed']
    : (snapshot: firestoreAdmin.QueryDocumentSnapshot<CM['model']['raw']>) => CM['model']['processed'];
}

export interface FTCollectionDescriberCoreWithoutSubcollection<E extends FTEnvironment, CM extends FTCollectionModel> {
  converter: ModelConverter<E, CM>;
  readonlyFields?: Record<keyof CM['model']['raw'], true>;
}
