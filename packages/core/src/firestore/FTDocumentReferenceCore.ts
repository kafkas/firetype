import type { firestore as firestoreAdmin } from 'firebase-admin';
import type { firestore as firestoreClient } from 'firebase';
import type { FTEnvironment, FTCollectionModel, FTModel } from '..';
import type { FTCollectionReferenceCore } from '.';

export abstract class FTDocumentReferenceCore<E extends FTEnvironment, CM extends FTCollectionModel> {
  public abstract collection<K extends keyof CM['sub']>(
    key: K
  ): FTCollectionReferenceCore<E, NonNullable<CM['sub']>[K]>;

  protected abstract collectionRef: FTCollectionReferenceCore<E, CM>;
  protected abstract uid: string;

  public get core() {
    return this.collectionRef.core.doc(this.uid) as E extends 'client'
      ? firestoreClient.DocumentReference
      : firestoreAdmin.DocumentReference;
  }

  public get coreWithSetConverter() {
    return this.collectionRef.coreWithSetConverter.doc(this.uid) as E extends 'client'
      ? firestoreClient.DocumentReference<FTModel.Processed<CM>>
      : firestoreAdmin.DocumentReference<FTModel.Processed<CM>>;
  }

  public get coreWithSetMergeConverter() {
    return this.collectionRef.coreWithSetMergeConverter.doc(this.uid) as E extends 'client'
      ? firestoreClient.DocumentReference<FTModel.Processed<CM>>
      : firestoreAdmin.DocumentReference<FTModel.Processed<CM>>;
  }

  /**
   * This is equivalent to `set(data)`.
   */
  public set(data: FTModel.LegalOutgoingSetData<E, CM>) {
    return this.coreWithSetConverter.set(data) as Promise<E extends 'client' ? void : firestoreAdmin.WriteResult>;
  }

  /**
   * This is equivalent to `set(data, { merge: true })`. To provide `mergeFields` option you must escape to core.
   */
  public setMerge(data: FTModel.LegalOutgoingUpdateData<E, CM>) {
    return this.coreWithSetMergeConverter.set(data, {
      merge: true,
    }) as Promise<E extends 'client' ? void : firestoreAdmin.WriteResult>;
  }

  /**
   * This is equivalent to `update(data)`.
   */
  public update(data: FTModel.LegalOutgoingUpdateData<E, CM>) {
    return this.core.update(data) as Promise<E extends 'client' ? void : firestoreAdmin.WriteResult>;
  }
}
