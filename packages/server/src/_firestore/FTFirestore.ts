import { firestore, app as firebaseApp } from 'firebase-admin';
import type { FTFirestoreModel } from '@firetype/core';
import type { FTFirestoreDescriber } from '../FTFirestoreDescriber';
import { FTCollectionReference } from '.';

export class FTFirestore<FM extends FTFirestoreModel> {
  public readonly core: typeof firestore;
  private _instance: firestore.Firestore | undefined;

  constructor(private readonly describer: FTFirestoreDescriber<FM>, private readonly app?: firebaseApp.App) {
    this.core = firestore;
    this._instance = undefined;
  }

  public get instance() {
    if (this._instance === undefined) {
      this._instance = firestore(this.app);
    }

    return this._instance;
  }

  public collection<K extends keyof FM>(key: K) {
    return new FTCollectionReference<FM[K]>(this.instance.collection(<string>key), this.describer[key]);
  }
}
