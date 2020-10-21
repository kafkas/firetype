import { firestore } from 'firebase';
import type { FTFieldValue } from '.';

export class ServerTimestamp implements FTFieldValue {
  public toFirestore() {
    return firestore.FieldValue.serverTimestamp();
  }
}
