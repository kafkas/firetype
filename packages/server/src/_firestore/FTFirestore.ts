import { firestore, app as firebaseApp } from 'firebase-admin';
import type { FTFirestoreModel } from '@firetype/core';
import type { FTFirestoreDescriber } from '../FTFirestoreDescriber';
import { FTCollectionReference } from '.';

export class FTFirestore<FM extends FTFirestoreModel> {
  public core: typeof firestore;
  public instance: firestore.Firestore;

  constructor(private readonly describer: FTFirestoreDescriber<FM>, private readonly app?: firebaseApp.App) {
    this.core = firestore;
    this.instance = firestore(this.app);
  }

  public collection<K extends keyof FM>(key: K) {
    return new FTCollectionReference<FM[K]>(this.instance.collection(<string>key), this.describer[key]);
  }
}
