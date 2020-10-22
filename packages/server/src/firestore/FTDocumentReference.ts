import { FTDocumentReferenceCore, FTCollectionModel, FTModel, DescriberUtils } from '@firetype/core';
import type { FTCollectionDescriber } from '../FTCollectionDescriber';
import { FTCollectionReference } from '.';

export class FTDocumentReference<CM extends FTCollectionModel> extends FTDocumentReferenceCore<'server', CM> {
  constructor(
    public readonly core: FirebaseFirestore.DocumentReference<FTModel.Processed<CM>>,
    private readonly describer: FTCollectionDescriber<CM>
  ) {
    super();
  }

  public collection<K extends keyof CM['sub']>(key: K) {
    if (!DescriberUtils.hasSubcollection(this.describer)) {
      throw new Error('Subcollection does not exist according to the describer.');
    }

    return new FTCollectionReference<NonNullable<CM['sub']>[K]>(
      this.core.collection(key as string),
      this.describer.sub[key]
    );
  }

  public update(data: Partial<FTModel.Raw<CM>>) {
    return this.core.update(data);
  }
}
