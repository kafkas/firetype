import firebase from 'firebase/app';
import { FTFirestoreCore, FTFirestoreModel } from '@firetype/core';
import type { FTFirestoreDescriber } from '../FTFirestoreDescriber';
import { FTCollectionReference } from '.';

const { firestore } = firebase;

export class FTFirestore<FM extends FTFirestoreModel> extends FTFirestoreCore<'client', FM> {
  public readonly core: typeof firebase.firestore;

  constructor(private readonly describer: FTFirestoreDescriber<FM>, app?: firebase.app.App) {
    super(app);
    this.core = firestore;
  }

  public collection<K extends keyof FM>(key: K) {
    return new FTCollectionReference<FM[K]>(this.instance.collection(<string>key), this.describer[key]);
  }
}
