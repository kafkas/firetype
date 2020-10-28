import type { firestore as firestoreClient } from 'firebase';
import type { firestore as firestoreAdmin } from 'firebase-admin';
import type {
  FTEnvironment,
  FTCollectionModel,
  FTModel,
  FTFieldValueDelete,
  FTFieldValueServerTimestamp,
  FTFieldValueArrayRemove,
  FTFieldValueArrayUnion,
  FTFieldValueIncrement,
  FTFieldValueDecrement,
} from '..';

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
 * Derives the shape of the raw object that can be used in and `set()`
 * (without merge) and `add()` methods.
 */
export type LegalOutgoingSetData<E extends FTEnvironment, CM extends FTCollectionModel> = LegalOutgoingData<
  E,
  CM,
  'set'
>;

export type LegalOutgoingUpdateData<E extends FTEnvironment, CM extends FTCollectionModel> = Partial<
  LegalOutgoingData<E, CM, 'update'>
>;

type LegalOutgoingData<
  E extends FTEnvironment,
  CM extends FTCollectionModel,
  TP extends 'set' | 'update'
> = E extends 'client'
  ? {
      [K in keyof FTModel.EditableSubtype<CM>]: LegalValue<E, FTModel.Raw<CM>[K], TP>;
    }
  : {
      [K in FTModel.Fields<CM>]: LegalValue<E, FTModel.Raw<CM>[K], TP>;
    };

type LegalValue<E extends FTEnvironment, V, TP extends 'set' | 'update'> = undefined extends V
  ? TP extends 'update'
    ? FTFieldValueDelete | LegalDefinedValue<E, V, TP>
    : LegalDefinedValue<E, V, TP>
  : LegalDefinedValue<E, V, TP>;

type LegalDefinedValue<E extends FTEnvironment, V, TP extends 'set' | 'update'> = V extends FirestoreTimestamp<E>
  ? FTFieldValueServerTimestamp | FirestoreTimestamp<E> | Date
  : V extends FirestoreGeoPoint<E>
  ? FirestoreGeoPoint<E>
  : V extends FirestoreDocumentReference<E, infer T>
  ? FirestoreDocumentReference<E, T>
  : V extends number
  ? FTFieldValueIncrement | FTFieldValueDecrement | number
  : V extends Array<infer T>
  ? T extends string | number
    ? T[] | FTFieldValueArrayRemove<T> | FTFieldValueArrayUnion<T>
    : Array<TP extends 'set' ? LegalDefinedValue<E, T, TP> : LegalValue<E, T, TP>>
  : V extends object
  ? {
      [K in keyof V]: TP extends 'set' ? LegalDefinedValue<E, V[K], TP> : LegalValue<E, V[K], TP>;
    }
  : V;
