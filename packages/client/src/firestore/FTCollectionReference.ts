import { FTCollectionReferenceCore, FTCollectionModel, FTModel } from '@firetype/core';
import type { FTCollectionDescriber } from '../FTCollectionDescriber';
import { FTDocumentReference } from '.';

export class FTCollectionReference<CM extends FTCollectionModel> extends FTCollectionReferenceCore<'client', CM> {
  constructor(
    public readonly core: firebase.firestore.CollectionReference,
    public readonly describer: FTCollectionDescriber<CM>
  ) {
    super();
  }

  public get coreWithSetConverter() {
    return this.core.withConverter(({
      fromFirestore: this.describer.converter.fromFirestore,
      toFirestore: this.describer.converter.toFirestore.set,
    } as unknown) as firebase.firestore.FirestoreDataConverter<FTModel.Processed<CM>>); // FIXME
  }

  public get coreWithSetMergeConverter() {
    return this.core.withConverter(({
      fromFirestore: this.describer.converter.fromFirestore,
      toFirestore: this.describer.converter.toFirestore.setMerge,
    } as unknown) as firebase.firestore.FirestoreDataConverter<FTModel.Processed<CM>>); // FIXME
  }

  public doc(uid: string) {
    return new FTDocumentReference(this, uid);
  }
}
