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
import { DocumentReference, Timestamp, GeoPoint } from '../firestore/types';

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

type LegalDefinedValue<E extends FTEnvironment, V, TP extends 'set' | 'update'> = V extends Timestamp<E>
  ? FTFieldValueServerTimestamp | Timestamp<E> | Date
  : V extends GeoPoint<E>
  ? GeoPoint<E>
  : V extends DocumentReference<E, infer T>
  ? DocumentReference<E, T>
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
