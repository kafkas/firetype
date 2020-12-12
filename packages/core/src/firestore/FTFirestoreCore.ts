import type { App } from '../types';
import type { FTFirestoreModel, FTEnvironment } from '..';
import type { FirestoreCore, Firestore } from './types';
import type { FTCollectionReferenceCore } from '.';

export abstract class FTFirestoreCore<E extends FTEnvironment, FM extends FTFirestoreModel> {
  public abstract readonly core: FirestoreCore<E>;
  private _instance?: Firestore<E>;

  constructor(private readonly _app?: App<E>) {
    this._instance = undefined;
  }

  public get instance() {
    if (this._instance === undefined) {
      // TODO: Remove `any` assertion
      this._instance = this.core(this._app as any) as Firestore<E>;
    }

    return this._instance;
  }

  public abstract collection<K extends keyof FM>(key: K): FTCollectionReferenceCore<E, FM[K]>;
}
