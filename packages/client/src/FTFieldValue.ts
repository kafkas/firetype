import { FTFieldValueCore } from '@firetype/core';
import { firestore } from 'firebase';

class FTFieldValueClient extends FTFieldValueCore<'client'> {
  public readonly core: typeof firestore.FieldValue;

  constructor() {
    super();
    this.core = firestore.FieldValue;
  }
}

export const FTFieldValue = new FTFieldValueClient();
