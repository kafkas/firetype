import type { firestore } from 'firebase';
import { FTCollectionDescriber, FTFirestoreDescriber, FTFirestore, FTFieldValue } from '../src';

interface EmailsCollectionModel {
  model: {
    raw: EmailDoc;
    processed: Email;
  };
  readonlyFields: {
    createdAt: true;
  };
}

interface EmailDoc {
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
  nestedField: {
    createdById: string;
    createdBy?: string;
    expiresAt?: firestore.Timestamp;
    likedBy: string[];
    createdAt: firestore.Timestamp;
  };
  lastLocation: firestore.GeoPoint;
  favEmailRef: firestore.DocumentReference<EmailDoc>;
  metadata?: string | null;
  timestamp?: number;
  sentAt?: firestore.Timestamp;
  receivedAt: firestore.Timestamp;
}

class Email {
  constructor(public readonly raw: EmailDoc) {}

  public get senderEmail() {
    return this.raw.from;
  }
}

interface FirestoreModel {
  emails: EmailsCollectionModel;
}

const emailsDescriber: FTCollectionDescriber<EmailsCollectionModel> = {
  converter: {
    toFirestore: email => {
      return {};
    },
    fromFirestore: (snapshot, options) => {
      return new Email(snapshot.data(options));
    },
  },
};

const describer: FTFirestoreDescriber<FirestoreModel> = {
  emails: emailsDescriber,
};

const Firestore = new FTFirestore<FirestoreModel>(describer);

const emailsQuery = Firestore.collection('emails').where('sentAt', '<=', new Date());

emailsQuery.get();

const email = 'anarkafkas@gmail.com';
const emailsCollection = Firestore.collection('emails');
const anarEmailDocRef = emailsCollection.doc(email);

anarEmailDocRef.update({
  metadata: FTFieldValue.delete(),
});
