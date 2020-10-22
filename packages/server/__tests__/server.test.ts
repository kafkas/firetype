import type { firestore } from 'firebase-admin';
import { FTFunctions, FTFirestore, FTCollectionDescriber, FTFirestoreDescriber } from '../src';

interface EmailsCollectionModel {
  model: {
    raw: EmailDoc;
    processed: Email;
  };
  readonlyFields: {
    sentAt: true;
    receivedAt: true;
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
    fromFirestore: snapshot => {
      const emailRaw = snapshot.data();
      return new Email(emailRaw);
    },
  },
};

const describer: FTFirestoreDescriber<FirestoreModel> = {
  emails: emailsDescriber,
};

const Functions = new FTFunctions<FirestoreModel>(describer);
const Firestore = new FTFirestore<FirestoreModel>(describer);

const email = 'anarkafkas@gmail.com';
const emailsCollection = Firestore.collection('emails');
const anarEmailDocRef = emailsCollection.doc(email);

anarEmailDocRef.update({});

const onCreate = Functions.runWith({ memory: '256MB' })
  .firestore.collection('emails')
  .genericDoc('emailId')
  .onCreate((snap, context) => {
    const { emailId } = context.params;
    const email = snap.data();

    snap.core.data();
  });

const onUpdate = Functions.firestore
  .collection('emails')
  .genericDoc('emailId')
  .onUpdate((snap, context) => {
    const { emailId } = context.params;
    const email = snap.after.data();

    snap.after.core.data();
  });

const onWrite = Functions.firestore
  .collection('emails')
  .genericDoc('emailId')
  .onWrite((snap, context) => {
    const { emailId } = context.params;
    const email = snap.after.data();

    snap.after.core.data();
  });
