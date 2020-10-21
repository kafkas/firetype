import { FTDocumentReferenceCore, FTCollectionModel, DescriberUtils, EditableFields } from '@firetype/core';
import type { FTCollectionDescriber } from '../FTCollectionDescriber';
import { FTCollectionReference } from '.';

export class FTDocumentReference<CM extends FTCollectionModel> extends FTDocumentReferenceCore<'client', CM> {
  constructor(
    public readonly core: firebase.firestore.DocumentReference<CM['model']['processed']>,
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

  /**
   * @param data - An object containing editable fields with their new values. The keys that you
   * have marked as read-only in the collection model are not accepted.
   */
  public update(data: Partial<EditableFields<CM>>) {
    return this.core.update(data);
  }
}
