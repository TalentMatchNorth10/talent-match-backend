import * as firebase from 'firebase-admin';
import dotenv from 'dotenv';
dotenv.config({ path: './config.env' });

const params = {
  type: process.env.FIREBASE_TYPE,
  projectId: process.env.FIREBASE_PROJECT_ID,
  privateKeyId: process.env.FIREBASE_PRIVATE_KEY_ID,
  privateKey: process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, '\n'),
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  clientId: process.env.FIREBASE_CLIENT_ID,
  authUri: process.env.FIREBASE_AUTH_URI,
  tokenUri: process.env.FIREBASE_TOKEN_URI,
  authProviderX509CertUrl: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
  clientC509CertUrl: process.env.FIREBASE_CLIENT_X509_CERT_URL
};

firebase.initializeApp({
  credential: firebase.credential.cert(params),
  storageBucket: `${process.env.FIREBASE_PROJECT_ID}.appspot.com`
});

export default firebase;
