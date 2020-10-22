import { FTFieldValueCore } from '@firetype/core';
import { firestore } from 'firebase-admin';

class FTFieldValueServer extends FTFieldValueCore<'server'> {
  public readonly core: typeof firestore.FieldValue;

  constructor() {
    super();
    this.core = firestore.FieldValue;
  }
}

export const FTFieldValue = new FTFieldValueServer();
