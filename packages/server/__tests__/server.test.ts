import { FTFunctions, FTFirestore, FTCollectionDescriber, FTFirestoreDescriber } from '../src';

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
    fromFirestore: snapshot => {
      const emailRaw = snapshot.data();
      return new Email(emailRaw);
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

const Functions = new FTFunctions<FirestoreModel>(describer);
const Firestore = new FTFirestore<FirestoreModel>(describer);

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
