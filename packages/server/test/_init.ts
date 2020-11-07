import { apps, initializeApp, credential } from 'firebase-admin';
import { resolve as resolvePath } from 'path';

const SERVICE_ACCOUNT_PATH = resolvePath(__dirname, '../../../serviceAccountKey.json');

if (apps.length === 0) {
  initializeApp({
    credential: credential.cert(SERVICE_ACCOUNT_PATH),
  });
}
