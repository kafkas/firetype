import type { firestore as firestoreAdmin, app as firebaseAppAdmin } from 'firebase-admin';
import type { firestore as firestoreClient, app as firebaseAppClient } from 'firebase';
import type { FTFirestoreModel, FTEnvironment } from '..';
import type { FTCollectionReferenceCore } from '.';

export abstract class FTFirestoreCore<E extends FTEnvironment, FM extends FTFirestoreModel> {
  public abstract readonly core: E extends 'client' ? typeof firestoreClient : typeof firestoreAdmin;
  private _instance?: E extends 'client' ? firestoreClient.Firestore : firestoreAdmin.Firestore;

  constructor(private readonly _app?: E extends 'client' ? firebaseAppClient.App : firebaseAppAdmin.App) {
    this._instance = undefined;
  }

  public get instance() {
    if (this._instance === undefined) {
      // TODO: Remove `any` assertion
      this._instance = this.core(this._app as any) as E extends 'client'
        ? firestoreClient.Firestore
        : FirebaseFirestore.Firestore;
    }

    return this._instance;
  }

  public abstract collection<K extends keyof FM>(key: K): FTCollectionReferenceCore<E, FM[K]>;
}
