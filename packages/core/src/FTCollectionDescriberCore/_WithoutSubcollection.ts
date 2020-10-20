import type firebaseAdmin from 'firebase-admin';
import type firebaseClient from 'firebase';
import type { FTCollectionModel, FTEnvironment } from '..';

/**
 * A stricter version of `FirebaseFirestore.FirestoreDataConverter` where
 * `RM` represents the raw model and `M` represents the main model.
 */
interface ModelConverter<E extends FTEnvironment, CM extends FTCollectionModel> {
  toFirestore: (modelObject: CM['model']['processed']) => CM['model']['raw'];
  fromFirestore: E extends 'client'
    ? (
        snapshot: firebaseClient.firestore.QueryDocumentSnapshot<CM['model']['raw']>,
        options: firebase.firestore.SnapshotOptions
      ) => CM['model']['processed']
    : (snapshot: firebaseAdmin.firestore.QueryDocumentSnapshot<CM['model']['raw']>) => CM['model']['processed'];
}

export interface FTCollectionDescriberCoreWithoutSubcollection<E extends FTEnvironment, CM extends FTCollectionModel> {
  converter: ModelConverter<E, CM>;
  readonlyFields?: Record<keyof CM['model']['raw'], true>;
}
