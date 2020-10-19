import * as functions from 'firebase-functions';
import type { FTFirestoreModel, FTFirestoreDescriber } from '@firetype/core';
import FTFunctionsFirestore from './firestore/FTFunctionsFirestore';
import FTFunctionBuilder from './_FTFunctionBuilder';

export class FTFunctions<FM extends FTFirestoreModel> {
  public readonly core: typeof functions;
  public readonly firestore: FTFunctionsFirestore<FM>;

  constructor(private readonly describer: FTFirestoreDescriber<FM>) {
    this.core = functions;
    this.firestore = new FTFunctionsFirestore(this.core, this.describer);
  }

  public runWith(opts: functions.RuntimeOptions) {
    return new FTFunctionBuilder(this.core.runWith(opts), this.describer);
  }
}
