import type { firestore as firestoreAdmin } from 'firebase-admin';
import type { firestore as firestoreClient } from 'firebase';
import type { FTEnvironment, FTCollectionModel, FTModel } from '..';
import type { FTCollectionReferenceCore } from '.';

export abstract class FTDocumentReferenceCore<E extends FTEnvironment, CM extends FTCollectionModel> {
  public abstract readonly core: E extends 'client'
    ? firestoreClient.DocumentReference
    : firestoreAdmin.DocumentReference;

  public abstract readonly coreWithSetConverter: E extends 'client'
    ? firestoreClient.DocumentReference<FTModel.Processed<CM>>
    : firestoreAdmin.DocumentReference<FTModel.Processed<CM>>;

  public abstract readonly coreWithSetMergeConverter: E extends 'client'
    ? firestoreClient.DocumentReference<FTModel.Processed<CM>>
    : firestoreAdmin.DocumentReference<FTModel.Processed<CM>>;

  public abstract collection<K extends keyof CM['sub']>(
    key: K
  ): FTCollectionReferenceCore<E, NonNullable<CM['sub']>[K]>;

  public update(data: FTModel.LegalOutgoingUpdateData<E, CM>) {
    return this.core.update(data) as Promise<E extends 'client' ? void : firestoreAdmin.WriteResult>;
  }
}
