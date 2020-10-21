import { firestore } from 'firebase';
import type { FTFieldValue } from '.';

export class Increment implements FTFieldValue {
  constructor(private readonly n: number) {}

  public toFirestore() {
    return firestore.FieldValue.increment(this.n);
  }
}
