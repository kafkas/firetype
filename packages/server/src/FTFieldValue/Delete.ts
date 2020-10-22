import { firestore } from 'firebase-admin';
import type { FTFieldValue } from '.';

export class Delete implements FTFieldValue {
  public toFirestore() {
    return firestore.FieldValue.delete();
  }
}
