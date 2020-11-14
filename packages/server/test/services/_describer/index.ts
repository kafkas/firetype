import type { FTFirestoreDescriber } from '../../../src';
import { emailsDescriber, EmailsCollectionModel } from './emails';
import { usersDescriber, UsersCollectionModel } from './users';

export type FirestoreModel = {
  emails: EmailsCollectionModel;
  users: UsersCollectionModel;
};

export const describer: FTFirestoreDescriber<FirestoreModel> = {
  emails: emailsDescriber,
  users: usersDescriber,
};
