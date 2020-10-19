import type * as functions from 'firebase-functions';
import type { FTFirestoreModel } from '@firetype/core';
import type { FTFirestoreDescriber } from './FTFirestoreDescriber';
import FTFunctionsFirestore from './firestore/FTFunctionsFirestore';

export default class FTFunctionBuilder<FM extends FTFirestoreModel> {
  public readonly firestore: FTFunctionsFirestore<FM>;

  constructor(public readonly core: functions.FunctionBuilder, private readonly describer: FTFirestoreDescriber<FM>) {
    this.firestore = new FTFunctionsFirestore(this.core, this.describer);
  }
}
