import { firestore } from 'firebase-admin';
import type { FTFieldValue } from '.';

export class ArrayRemove<T> implements FTFieldValue {
  private readonly elements: T[];

  constructor(...elements: T[]) {
    this.elements = elements;
  }

  public toFirestore() {
    return firestore.FieldValue.arrayRemove(this.elements);
  }
}
