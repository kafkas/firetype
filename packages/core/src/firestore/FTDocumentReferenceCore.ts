import type firebaseAdmin from 'firebase-admin';
import type firebaseClient from 'firebase';
import type { FTCollectionModel, FTEnvironment } from '..';
import type { FTCollectionReferenceCore } from '.';

export abstract class FTDocumentReferenceCore<E extends FTEnvironment, CM extends FTCollectionModel> {
  public abstract readonly core: E extends 'client'
    ? firebaseClient.firestore.DocumentReference<CM['model']['processed']>
    : firebaseAdmin.firestore.DocumentReference<CM['model']['processed']>;

  public abstract collection<K extends keyof CM['sub']>(
    key: K
  ): FTCollectionReferenceCore<E, NonNullable<CM['sub']>[K]>;

  public update(data: Partial<CM['model']['raw']>) {
    return this.core.update(data);
  }
}
