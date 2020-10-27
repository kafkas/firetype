# Firetype Server

Firetype is a lightweight TypeScript library that lets you strictly type your Firebase architecture.

Firetype Server wraps the Firebase [Admin](https://github.com/firebase/firebase-admin-node) and [Cloud Functions](https://github.com/firebase/firebase-functions) SDKs in a way that lets you provide a set of types describing your data so you can prevent bugs, errors and crashes at compile time. It remembers the "schema" that you feed to it and stops you from writing bad code. This, combined with the ease with which it lets you bring changes to your codebase, provides a great developer experience.

<p>
    <a href="https://npmjs.com/package/@firetype/server" alt="Version">
        <img src="https://img.shields.io/npm/v/@firetype/server" /></a>
    <a href="https://npmjs.com/package/@firetype/server" alt="Size">
        <img src="https://img.shields.io/bundlephobia/min/@firetype/server" /></a>
    <a href="https://" alt="Types">
        <img src="https://img.shields.io/npm/types/@firetype/server" /></a>  
    <a href="https://" alt="Activity">
        <img src="https://img.shields.io/github/last-commit/kafkas/firetype" /></a>
    <a href="https://npmjs.com/package/@firetype/server" alt="Downloads">
        <img src="https://img.shields.io/npm/dm/@firetype/server" /></a>
</p>

## Installation

If you haven't already installed `firebase-admin` and `firebase-functions`, run
```
npm install firebase-admin firebase-functions
```

Then,
```
npm install @firetype/server
```

## Docs

TODO