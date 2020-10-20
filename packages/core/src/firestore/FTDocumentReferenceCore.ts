import type { firestore as firestoreAdmin } from 'firebase-admin';
import type { firestore as firestoreClient } from 'firebase';
import type { FTCollectionModel, FTEnvironment } from '..';
import type { FTCollectionReferenceCore } from '.';

export abstract class FTDocumentReferenceCore<E extends FTEnvironment, CM extends FTCollectionModel> {
  public abstract readonly core: E extends 'client'
    ? firestoreClient.DocumentReference<CM['model']['processed']>
    : firestoreAdmin.DocumentReference<CM['model']['processed']>;

  public abstract collection<K extends keyof CM['sub']>(
    key: K
  ): FTCollectionReferenceCore<E, NonNullable<CM['sub']>[K]>;

  public update(data: Partial<CM['model']['raw']>) {
    return this.core.update(data);
  }
}
