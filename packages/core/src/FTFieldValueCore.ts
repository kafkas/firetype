import type { firestore as firestoreAdmin } from 'firebase-admin';
import type { firestore as firestoreClient } from 'firebase';
import type { FTEnvironment } from '.';

/* eslint-disable @typescript-eslint/no-empty-interface */

export interface FTFieldValueDelete {}
export interface FTFieldValueServerTimestamp {}

export abstract class FTFieldValueCore<E extends FTEnvironment> {
  public abstract readonly core: E extends 'client'
    ? typeof firestoreClient.FieldValue
    : typeof firestoreAdmin.FieldValue;

  public delete() {
    return this.core.delete() as FTFieldValueDelete;
  }

  public serverTimestamp() {
    return this.core.serverTimestamp() as FTFieldValueServerTimestamp;
  }
}
