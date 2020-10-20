import { firestore, app as firebaseApp } from 'firebase-admin';
import { FTFirestoreCore, FTFirestoreModel } from '@firetype/core';
import type { FTFirestoreDescriber } from '../FTFirestoreDescriber';
import { FTCollectionReference } from '.';

export class FTFirestore<FM extends FTFirestoreModel> extends FTFirestoreCore<'server', FM> {
  public readonly core: typeof firestore;

  constructor(private readonly describer: FTFirestoreDescriber<FM>, app?: firebaseApp.App) {
    super(app);
    this.core = firestore;
  }

  public collection<K extends keyof FM>(key: K) {
    return new FTCollectionReference<FM[K]>(this.instance.collection(<string>key), this.describer[key]);
  }
}
