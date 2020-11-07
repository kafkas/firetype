import type { firestore } from 'firebase-admin';
import type { FTCollectionDescriber } from '../../../src';
import { removeUndefinedFields } from '../../utils';

export type EmailDoc = {
  from: string;
  to: string;
  tags: string[];
  someObjects: {
    code: number;
    isFavourite?: boolean;
    location: firestore.GeoPoint;
    createdAt: firestore.Timestamp;
    stuff: null | string[];
  }[];
  someField: {
    createdBy?: string;
    expiresAt?: firestore.Timestamp;
    likedBy: string[];
    createdAt: firestore.Timestamp;
    nestedField: {
      name: string;
      count?: number;
    };
  };
  lastLocation: firestore.GeoPoint;
  favEmailRef: firestore.DocumentReference<EmailDoc>;
  metadata?: string | null;
  timestamp?: number;
  sentAt?: firestore.Timestamp;
  createdAt: firestore.Timestamp;
};

export class Email {
  constructor(public readonly id: string, public readonly raw: EmailDoc) {}

  get createdAt() {
    return this.raw.createdAt.toDate();
  }
}

export type EmailsCollectionModel = {
  model: {
    raw: EmailDoc;
    processed: Email;
  };
  readonlyFields: {
    createdAt: true;
    to: true;
  };
};

export const emailsDescriber: FTCollectionDescriber<EmailsCollectionModel> = {
  converter: {
    toFirestore: {
      set: email => {
        return email.raw;
      },
      setMerge: partialEmail => {
        return removeUndefinedFields(partialEmail.raw ?? {});
      },
    },
    fromFirestore: emailDocSnapshot => {
      return new Email(emailDocSnapshot.id, emailDocSnapshot.data());
    },
  },
};
