import { FTCollectionDescriber, FTFirestoreDescriber, FTFirestore, FTFieldValue } from '../src';

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
  metadata?: string;
  sentAt: Date;
  receivedAt: Date;
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
      return {
        from: email.raw.from,
        to: email.raw.to,
      };
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
  from: '',
});
