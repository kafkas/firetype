import type firebaseAdmin from 'firebase-admin';
import type firebaseClient from 'firebase';
import type { FTFirestoreModel, FTEnvironment } from '..';
import type { FTCollectionReference } from '.';

export abstract class FTFirestoreCore<E extends FTEnvironment, FM extends FTFirestoreModel> {
  public abstract readonly core: E extends 'client' ? typeof firebaseClient.firestore : typeof firebaseAdmin.firestore;
  private _instance?: E extends 'client' ? firebaseClient.firestore.Firestore : firebaseAdmin.firestore.Firestore;

  constructor(private readonly _app?: E extends 'client' ? firebaseClient.app.App : firebaseAdmin.app.App) {
    this._instance = undefined;
  }

  public get instance() {
    if (this._instance === undefined) {
      // TODO: Remove `any` assertion
      this._instance = this.core(this._app as any) as E extends 'client'
        ? firebaseClient.firestore.Firestore
        : FirebaseFirestore.Firestore;
    }

    return this._instance;
  }

  public abstract collection<K extends keyof FM>(key: K): FTCollectionReference<E, FM[K]>;
}
