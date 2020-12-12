import type firebase from 'firebase/app';
import { FTCollectionReferenceCore, FTCollectionModel } from '@firetype/core';
import type { FTCollectionDescriber } from '../FTCollectionDescriber';
import { FTDocumentReference } from '.';

export class FTCollectionReference<CM extends FTCollectionModel> extends FTCollectionReferenceCore<'client', CM> {
  constructor(
    public readonly core: firebase.firestore.CollectionReference,
    public readonly describer: FTCollectionDescriber<CM>
  ) {
    super();
  }

  public doc(uid: string) {
    return new FTDocumentReference(this, uid);
  }
}
