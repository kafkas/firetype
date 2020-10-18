import { FTFirestoreDescriber } from '../src/describers';

interface DataModel {
  emails: {
    model: {
      raw: EmailDoc;
      processed: Email;
    };
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

const describer: FTFirestoreDescriber<DataModel> = {
  emails: {
    converter: {
      toFirestore: email => email.raw,
      fromFirestore: docData => new Email(docData),
    },
    readonlyFields: {
      sentAt: true,
      receivedAt: true,
    },
  },
};

console.log(describer.emails);
