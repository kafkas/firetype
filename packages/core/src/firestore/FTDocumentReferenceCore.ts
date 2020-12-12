import type { FTEnvironment, FTCollectionModel, FTModel } from '..';
import type { DocumentSnapshot, DocumentReference, WriteResult } from './types';
import type { FTCollectionReferenceCore } from '.';

export abstract class FTDocumentReferenceCore<E extends FTEnvironment, CM extends FTCollectionModel> {
  public abstract collection<K extends keyof CM['sub']>(
    key: K
  ): FTCollectionReferenceCore<E, NonNullable<CM['sub']>[K]>;

  protected abstract collectionRef: FTCollectionReferenceCore<E, CM>;
  protected abstract uid: string;

  public get core() {
    return this.collectionRef.core.doc(this.uid) as DocumentReference<E>;
  }

  public coreWithConverter<ST extends 'set' | 'setMerge'>(setType: ST) {
    return this.collectionRef.coreWithConverter(setType).doc(this.uid) as DocumentReference<E, FTModel.Processed<CM>>;
  }

  public get() {
    return this.coreWithConverter('set').get() as Promise<DocumentSnapshot<E, FTModel.Processed<CM>>>;
  }

  /**
   * This is equivalent to `set(data)`.
   */
  public set(data: FTModel.Processed<CM>) {
    return this.coreWithConverter('set').set(data) as Promise<WriteResult<E>>;
  }

  /**
   * This is equivalent to `set(data, { merge: true })`. To provide `mergeFields` option you must escape to core.
   */
  public setMerge(data: Partial<FTModel.Processed<CM>>) {
    return this.coreWithConverter('setMerge').set(data, {
      merge: true,
    }) as Promise<WriteResult<E>>;
  }

  /**
   * This is equivalent to `update(data)`.
   */
  public update(data: FTModel.LegalOutgoingUpdateData<E, CM>) {
    return this.core.update(data) as Promise<WriteResult<E>>;
  }
}
