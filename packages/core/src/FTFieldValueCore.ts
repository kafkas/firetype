import type { FTEnvironment } from '.';
import type { FieldValueCore } from './firestore/types';

/* eslint-disable @typescript-eslint/no-unused-vars */

export interface FTFieldValueIncrement {}
export interface FTFieldValueDecrement {}
export interface FTFieldValueDelete {}
export interface FTFieldValueServerTimestamp {}
export interface FTFieldValueArrayRemove<_> {}
export interface FTFieldValueArrayUnion<_> {}

export abstract class FTFieldValueCore<E extends FTEnvironment> {
  public abstract readonly core: FieldValueCore<E>;

  public increment(n: number) {
    return this.core.increment(n) as FTFieldValueIncrement;
  }

  public decrement(n: number) {
    return this.core.increment(-n) as FTFieldValueDecrement;
  }

  public delete() {
    return this.core.delete() as FTFieldValueDelete;
  }

  public serverTimestamp() {
    return this.core.serverTimestamp() as FTFieldValueServerTimestamp;
  }

  // TODO: Check if boolean, undefined, null can be passed to arrayRemove and arrayUnion
  public arrayRemove<T extends string | number>(...elements: T[]) {
    return this.core.arrayRemove(...elements) as FTFieldValueArrayRemove<T>;
  }

  public arrayUnion<T extends string | number>(...elements: T[]) {
    return this.core.arrayUnion(...elements) as FTFieldValueArrayUnion<T>;
  }
}
