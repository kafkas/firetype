# Firetype

Firetype is a lightweight TypeScript library that lets you strictly type your Firebase architecture.

Firetype wraps the Firebase SDK in a way that lets you provide a set of types describing your data so you can prevent bugs, errors and crashes at compile time. It remembers the "schema" that you feed to it and stops you from writing bad code. This, combined with the ease with which it lets you bring changes to your codebase, provides a great developer experience.

Firetype comprises 2 packages, [Firetype Client](packages/client) and [Firetype Server](packages/server), both of which rely on a single direct dependency: [Firetype Core](packages/core). Whereas [Firetype Client](packages/client) must be used alongside [Firebase JS SDK](https://github.com/firebase/firebase-js-sdk), [Firetype Server](packages/server) must be used with [Firebase Admin SDK](https://github.com/firebase/firebase-admin-node) and [Firebase Cloud Functions SDK](https://github.com/firebase/firebase-functions).

<p>
    <a href="https://lerna.js.org/" alt="Framework">
        <img src="https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg" /></a>
    <a href="https://github.com/kafkas/firetype" alt="Activity">
        <img src="https://img.shields.io/github/commit-activity/m/kafkas/firetype" /></a>
    <a href="https://" alt="Last Commit">
        <img src="https://img.shields.io/github/last-commit/kafkas/firetype" /></a>
</p>

## Packages

### [Firetype Client](packages/client)

### [Firetype Server](packages/server)

## License

This project is made available under the MIT License.
