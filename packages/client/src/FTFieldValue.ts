import { FTFieldValueCore } from '@firetype/core';
import firebase from 'firebase/app';

const { firestore } = firebase;

class FTFieldValueClient extends FTFieldValueCore<'client'> {
  public readonly core: typeof firebase.firestore.FieldValue;

  constructor() {
    super();
    this.core = firestore.FieldValue;
  }
}

export const FTFieldValue = new FTFieldValueClient();
