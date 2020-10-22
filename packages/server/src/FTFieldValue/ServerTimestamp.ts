import { firestore } from 'firebase-admin';
import type { FTFieldValue } from '.';

export class ServerTimestamp implements FTFieldValue {
  public toFirestore() {
    return firestore.FieldValue.serverTimestamp();
  }
}
