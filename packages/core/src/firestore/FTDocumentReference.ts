import type firebaseAdmin from 'firebase-admin';
import type firebaseClient from 'firebase';
import type { FTCollectionModel, FTEnvironment } from '..';

export abstract class FTDocumentReference<E extends FTEnvironment, CM extends FTCollectionModel> {
  public abstract readonly core: E extends 'client'
    ? firebaseClient.firestore.DocumentReference<CM['model']['processed']>
    : firebaseAdmin.firestore.DocumentReference<CM['model']['processed']>;

  public update(data: Partial<CM['model']['raw']>) {
    return this.core.update(data);
  }
}
