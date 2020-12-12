import type { app as firestoreAdminApp } from 'firebase-admin';
import type { FTEnvironment } from '.';

export type App<E extends FTEnvironment> = E extends 'client' ? firebase.default.app.App : firestoreAdminApp.App;
