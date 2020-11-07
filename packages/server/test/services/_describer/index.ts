import type { FTFirestoreDescriber } from '../../../src';
import { emailsDescriber, EmailsCollectionModel } from './emails';

export type FirestoreModel = {
  emails: EmailsCollectionModel;
};

export const describer: FTFirestoreDescriber<FirestoreModel> = {
  emails: emailsDescriber,
};
