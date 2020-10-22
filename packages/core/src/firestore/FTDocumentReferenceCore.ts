import type { firestore as firestoreAdmin } from 'firebase-admin';
import type { firestore as firestoreClient } from 'firebase';
import type { FTEnvironment, FTCollectionModel, FTProcessedModel } from '..';
import type { FTCollectionReferenceCore } from '.';

export abstract class FTDocumentReferenceCore<E extends FTEnvironment, CM extends FTCollectionModel> {
  public abstract readonly core: E extends 'client'
    ? firestoreClient.DocumentReference<FTProcessedModel<CM>>
    : firestoreAdmin.DocumentReference<FTProcessedModel<CM>>;

  public abstract collection<K extends keyof CM['sub']>(
    key: K
  ): FTCollectionReferenceCore<E, NonNullable<CM['sub']>[K]>;

  public abstract update(data: unknown): Promise<E extends 'client' ? void : firestoreAdmin.WriteResult>;
}
