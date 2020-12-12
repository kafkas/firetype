import type firebase from 'firebase/app';
import type { firestore as firestoreAdmin } from 'firebase-admin';
import type { FTEnvironment } from '..';

export type FirestoreCore<E extends FTEnvironment> = E extends 'client'
  ? typeof firebase.firestore
  : typeof firestoreAdmin;

/**
 * Firestore instance type.
 */
export type Firestore<E extends FTEnvironment> = E extends 'client'
  ? firebase.firestore.Firestore
  : firestoreAdmin.Firestore;

export type CollectionReference<E extends FTEnvironment, T = DocumentData<E>> = E extends 'client'
  ? firebase.firestore.CollectionReference<T>
  : firestoreAdmin.CollectionReference<T>;

export type DocumentReference<E extends FTEnvironment, T = DocumentData<E>> = E extends 'client'
  ? firebase.firestore.DocumentReference<T>
  : firestoreAdmin.DocumentReference<T>;

export type Query<E extends FTEnvironment, T = DocumentData<E>> = E extends 'client'
  ? firebase.firestore.Query<T>
  : firestoreAdmin.Query<T>;

export type WhereFilterOp<E extends FTEnvironment> = E extends 'client'
  ? firebase.firestore.WhereFilterOp
  : FirebaseFirestore.WhereFilterOp;

export type QueryDocumentSnapshot<E extends FTEnvironment, T = DocumentData<E>> = E extends 'client'
  ? firebase.firestore.QueryDocumentSnapshot<T>
  : firestoreAdmin.QueryDocumentSnapshot<T>;

export type DocumentSnapshot<E extends FTEnvironment, T = DocumentData<E>> = E extends 'client'
  ? firebase.firestore.DocumentSnapshot<T>
  : firestoreAdmin.DocumentSnapshot<T>;

export type DocumentData<E extends FTEnvironment> = E extends 'client'
  ? firebase.firestore.DocumentData
  : firestoreAdmin.DocumentData;

export type WriteResult<E extends FTEnvironment> = E extends 'client' ? void : firestoreAdmin.WriteResult;

export type Timestamp<E extends FTEnvironment> = E extends 'client'
  ? firebase.firestore.Timestamp
  : firestoreAdmin.Timestamp;

export type GeoPoint<E extends FTEnvironment> = E extends 'client'
  ? firebase.firestore.GeoPoint
  : firestoreAdmin.GeoPoint;

export type SetOptions<E extends FTEnvironment> = E extends 'client'
  ? firebase.firestore.SetOptions
  : FirebaseFirestore.SetOptions;

export type SnapshotOptions<E extends FTEnvironment> = E extends 'client' ? firebase.firestore.SnapshotOptions : never;

export type FieldValueCore<E extends FTEnvironment> = E extends 'client'
  ? typeof firebase.firestore.FieldValue
  : typeof firestoreAdmin.FieldValue;
