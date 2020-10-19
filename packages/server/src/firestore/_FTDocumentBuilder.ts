import type * as funcs from 'firebase-functions';
import type { FTCollectionModel } from '@firetype/core';
import type { FTCollectionDescriber } from '../FTCollectionDescriber';
import { FTDocumentSnapshot } from './_FTDocumentSnapshot';
import { FTQueryDocumentSnapshot } from './_FTQueryDocumentSnapshot';
import type { FTWildcardObject } from '../_FTWildcardObject';
import FTCollectionBuilder from './_FTCollectionBuilder';

/* eslint-disable @typescript-eslint/no-explicit-any */

type FTEventContext<T extends FTWildcardObject> = funcs.EventContext & {
  params: T;
};

type FTSnapshotHandler<CM extends FTCollectionModel, T extends FTWildcardObject> = (
  snapshot: FTQueryDocumentSnapshot<CM>,
  context: FTEventContext<T>
) => any;

type FTUpdateChangeHandler<CM extends FTCollectionModel, T extends FTWildcardObject> = (
  change: {
    before: FTQueryDocumentSnapshot<CM>;
    after: FTQueryDocumentSnapshot<CM>;
  },
  context: FTEventContext<T>
) => any;

type FTWriteChangeHandler<CM extends FTCollectionModel, T extends FTWildcardObject> = (
  change: {
    before: FTDocumentSnapshot<CM>;
    after: FTDocumentSnapshot<CM>;
  },
  context: FTEventContext<T>
) => any;

export default class FTDocumentPath<CM extends FTCollectionModel, T extends FTWildcardObject> {
  constructor(
    private readonly functions: typeof funcs | funcs.FunctionBuilder,
    private readonly describer: FTCollectionDescriber<CM>,
    public readonly path: string
  ) {}

  public collection<K extends keyof CM['sub']>(key: K) {
    if (!Object.prototype.hasOwnProperty.call(this.describer, 'sub')) {
      throw new Error('Subcollection does not exist according to the data model.');
    }

    return new FTCollectionBuilder<NonNullable<CM['sub']>[K], T>(
      this.functions,
      /* eslint-disable-next-line */
      (<any>this.describer).sub[key as string], // FIXME: Remove `any` assertion
      this.nextPath(key as string)
    );
  }

  public onCreate(handler: FTSnapshotHandler<CM, T>) {
    return this.functions.firestore.document(this.path).onCreate((snapshot, context) => {
      return handler(new FTQueryDocumentSnapshot(snapshot, this.describer), context as FTEventContext<T>);
    });
  }

  public onUpdate(handler: FTUpdateChangeHandler<CM, T>) {
    return this.functions.firestore.document(this.path).onUpdate((change, context) => {
      return handler(
        {
          before: new FTQueryDocumentSnapshot(change.before, this.describer),
          after: new FTQueryDocumentSnapshot(change.after, this.describer),
        },
        context as FTEventContext<T>
      );
    });
  }

  public onWrite(handler: FTWriteChangeHandler<CM, T>) {
    return this.functions.firestore.document(this.path).onWrite((change, context) => {
      return handler(
        {
          before: new FTDocumentSnapshot(change.before, this.describer),
          after: new FTDocumentSnapshot(change.after, this.describer),
        },
        context as FTEventContext<T>
      );
    });
  }

  public onDelete(handler: FTSnapshotHandler<CM, T>) {
    return this.functions.firestore.document(this.path).onDelete((snapshot, context) => {
      return handler(new FTQueryDocumentSnapshot(snapshot, this.describer), context as FTEventContext<T>);
    });
  }

  private nextPath(key: string) {
    return `${this.path}/${key}`;
  }
}
