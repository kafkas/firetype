import type * as funcs from 'firebase-functions';
import type { FTCollectionModel } from '@firetype/core';
import type { ObjectLiteralUnion } from '../_utils/types';
import type { FTCollectionDescriber } from '../FTCollectionDescriber';
import { FTWildcardObject, FTDocumentBuilder } from '.';

export class FTCollectionBuilder<CM extends FTCollectionModel, T extends FTWildcardObject> {
  constructor(
    private readonly functions: typeof funcs | funcs.FunctionBuilder,
    private readonly describer: FTCollectionDescriber<CM>,
    public readonly path: string
  ) {}

  public doc(uid: string) {
    return new FTDocumentBuilder<CM, T>(this.functions, this.describer, this.nextPath(uid));
  }

  private nextPath(key: string) {
    return `${this.path}/${key}`;
  }

  public genericDoc<W extends string>(wildcard: W) {
    return new FTDocumentBuilder<CM, ObjectLiteralUnion<T, W>>(
      this.functions,
      this.describer,
      this.nextGenericPath(wildcard)
    );
  }

  private nextGenericPath(key: string) {
    return `${this.path}/{${key}}`;
  }
}
