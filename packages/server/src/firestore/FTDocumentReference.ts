import { FTDocumentReferenceCore, FTCollectionModel, DescriberUtils } from '@firetype/core';
import { FTCollectionReference } from '.';

export class FTDocumentReference<CM extends FTCollectionModel> extends FTDocumentReferenceCore<'server', CM> {
  constructor(private readonly collectionRef: FTCollectionReference<CM>, private readonly uid: string) {
    super();
  }

  public get core() {
    return this.collectionRef.core.doc(this.uid);
  }

  public get coreWithSetConverter() {
    return this.collectionRef.coreWithSetConverter.doc(this.uid);
  }

  public get coreWithSetMergeConverter() {
    return this.collectionRef.coreWithSetMergeConverter.doc(this.uid);
  }

  public collection<K extends keyof CM['sub']>(key: K) {
    if (!DescriberUtils.hasSubcollection(this.collectionRef.describer)) {
      throw new Error('Subcollection does not exist according to the describer.');
    }

    return new FTCollectionReference<NonNullable<CM['sub']>[K]>(
      this.core.collection(key as string),
      this.collectionRef.describer.sub[key]
    );
  }
}
