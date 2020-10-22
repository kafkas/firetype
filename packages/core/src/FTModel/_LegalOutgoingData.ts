import type { firestore as firestoreClient } from 'firebase';
import type { firestore as firestoreAdmin } from 'firebase-admin';
import type { FTEnvironment, FTCollectionModel, FTModel, FTFieldValueDelete, FTFieldValueServerTimestamp } from '..';

type FirestoreTimestamp<E extends FTEnvironment> = E extends 'client'
  ? firestoreClient.Timestamp
  : firestoreAdmin.Timestamp;

type FirestoreGeoPoint<E extends FTEnvironment> = E extends 'client'
  ? firestoreClient.GeoPoint
  : firestoreAdmin.GeoPoint;

type FirestoreDocumentReference<E extends FTEnvironment, T> = E extends 'client'
  ? firestoreClient.DocumentReference<T>
  : firestoreAdmin.DocumentReference<T>;

/**
 * Derives the shape of the raw object that can be used in FTDocumentReference.update() and
 * FTDocumentReference.set() methods.
 */
export type LegalOutgoingData<E extends FTEnvironment, CM extends FTCollectionModel> = {
  [K in E extends 'client' ? FTModel.EditableFields<CM> : FTModel.Fields<CM>]: LegalValue<E, FTModel.Raw<CM>[K]>;
};

type LegalValue<E extends FTEnvironment, V> = LegalValue_1<E, V>;

type LegalValue_1<E extends FTEnvironment, V> = undefined extends V
  ? FTFieldValueDelete | LegalValue_2<E, V>
  : LegalValue_2<E, V>;

type LegalValue_2<E extends FTEnvironment, V> = V extends FirestoreTimestamp<E>
  ? FTFieldValueServerTimestamp | FirestoreTimestamp<E>
  : LegalValue_3<E, V>;

type LegalValue_3<E extends FTEnvironment, V> = V extends FirestoreGeoPoint<E>
  ? FirestoreGeoPoint<E>
  : LegalValue_4<E, V>;

type LegalValue_4<E extends FTEnvironment, V> = V extends FirestoreDocumentReference<E, infer T>
  ? FirestoreDocumentReference<E, T>
  : LegalValue_5<E, V>;

type LegalValue_5<E extends FTEnvironment, V> = V extends Array<infer T>
  ? Array<LegalValue_1<E, T>>
  : LegalValue_6<E, V>;

type LegalValue_6<E extends FTEnvironment, V> = V extends object
  ? {
      [K in keyof V]: LegalValue_1<E, V[K]>;
    }
  : V;
