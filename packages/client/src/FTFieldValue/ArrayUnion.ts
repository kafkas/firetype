import { firestore } from 'firebase';
import type { FTFieldValue } from '.';

export class ArrayUnion<T> implements FTFieldValue {
  readonly elements: T[];

  constructor(...elements: T[]) {
    this.elements = elements;
  }

  public toFirestore() {
    return firestore.FieldValue.arrayUnion(this.elements);
  }
}
