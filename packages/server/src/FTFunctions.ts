import * as functions from 'firebase-functions';
import type { FTFirestoreModel } from '@firetype/core';
import { FTFunctionsFirestore } from './firestore';
import type { FTFirestoreDescriber } from './FTFirestoreDescriber';
import { FTFunctionBuilder } from './_FTFunctionBuilder';

export class FTFunctions<FM extends FTFirestoreModel> {
  public readonly core: typeof functions;
  private _firestore: FTFunctionsFirestore<FM> | undefined;

  constructor(private readonly describer: FTFirestoreDescriber<FM>) {
    this.core = functions;
    this._firestore = undefined;
  }

  public get firestore() {
    if (this._firestore === undefined) {
      this._firestore = new FTFunctionsFirestore(this.core, this.describer);
    }

    return this._firestore;
  }

  public runWith(opts: functions.RuntimeOptions) {
    return new FTFunctionBuilder(this.core.runWith(opts), this.describer);
  }
}
