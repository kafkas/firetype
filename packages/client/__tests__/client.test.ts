import { FTCollectionDescriber, FTFirestoreDescriber, FTFirestore } from '../src';

interface EmailsCollectionModel {
  model: {
    raw: EmailDoc;
    processed: Email;
  };
}

interface EmailDoc {
  from: string;
  to: string;
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
    toFirestore: email => email.raw,
    fromFirestore: (snapshot, options) => {
      return new Email(snapshot.data(options));
    },
  },
  readonlyFields: {
    sentAt: true,
    receivedAt: true,
  },
};

const describer: FTFirestoreDescriber<FirestoreModel> = {
  emails: emailsDescriber,
};

const Firestore = new FTFirestore<FirestoreModel>(describer);

const emailsQuery = Firestore.collection('emails').where('sentAt', '<=', new Date());

const email = 'anarkafkas@gmail.com';
const emailsCollection = Firestore.collection('emails');
const anarEmailDocRef = emailsCollection.doc(email);
