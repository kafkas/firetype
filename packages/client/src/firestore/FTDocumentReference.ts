import { FTDocumentReferenceCore, FTCollectionModel, DescriberUtils } from '@firetype/core';
import { FTCollectionReference } from '.';

export class FTDocumentReference<CM extends FTCollectionModel> extends FTDocumentReferenceCore<'client', CM> {
  constructor(protected readonly collectionRef: FTCollectionReference<CM>, protected readonly uid: string) {
    super();
  }

  /**
   * @throws {Error} If the subcollection doesn't exist according to the schema.
   */
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
