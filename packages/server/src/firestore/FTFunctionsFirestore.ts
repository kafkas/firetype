import type * as funcs from 'firebase-functions';
import type { FTFirestoreModel } from '@firetype/core';
import type { FTFirestoreDescriber } from '../FTFirestoreDescriber';
import FTCollectionBuilder from './_FTCollectionBuilder';

export default class FTFunctionsFirestore<FM extends FTFirestoreModel> {
  constructor(
    private readonly functions: typeof funcs | funcs.FunctionBuilder,
    private readonly describer: FTFirestoreDescriber<FM>
  ) {}

  public collection<K extends keyof FM>(key: K) {
    return new FTCollectionBuilder<FM[K], {}>(this.functions, this.describer[key], <string>key);
  }
}
