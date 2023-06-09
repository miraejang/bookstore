import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { getDatabase, ref, get, set, remove } from 'firebase/database';
import { v4 as uuid } from 'uuid';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEANSUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const auth = getAuth();
const database = getDatabase(app);

export async function login() {
  return signInWithPopup(auth, provider)
    .then((result) => {
      // const credential = GoogleAuthProvider.credentialFromResult(result);
      // const token = credential.accessToken;
      const user = result.user;
      return user;
    })
    .catch((error) => {
      // const errorCode = error.code;
      // const errorMessage = error.message;
      // const email = error.customData.email;
      // const credential = GoogleAuthProvider.credentialFromError(error);
    });
}

export async function logout() {
  signOut(auth).catch(console.error);
}

export async function onAuthStateChange(callback) {
  return onAuthStateChanged(auth, (user) => callback(user));
}

export async function getBooks() {
  return get(ref(database, 'books'))
    .then((snapshot) => {
      if (snapshot.exists()) {
        return Object.values(snapshot.val());
      } else {
        return null;
      }
    })
    .catch(console.error);
}

export async function getBook(id) {
  return get(ref(database, `books/${id}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        return null;
      }
    })
    .catch(console.error);
}

export async function addBook(book) {
  const id = book.id || uuid();
  const now = book.createdAt || Date.now();
  set(ref(database, `books/${id}`), {
    ...book,
    id,
    price: parseInt(book.price, 10),
    discount: book.discount && parseInt(book.discount),
    createdAt: now,
  });
}

export async function removeBook(bookId) {
  remove(ref(database, `books/${bookId}`));
}

export async function getCategory() {
  return get(ref(database, 'category'))
    .then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        return null;
      }
    })
    .catch(console.error);
}

export async function addCart(uid, book) {
  set(ref(database, `users/${uid}/cart/${book.id}`), book);
}

export async function getCart(uid) {
  return get(ref(database, `users/${uid}/cart`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        return null;
      }
    })
    .catch(console.error);
}

export async function removeFromCart(uid, bookId) {
  remove(ref(database, `users/${uid}/cart/${bookId}`));
}

export async function addOrder(uid, order) {
  const id = uuid();
  const now = Date.now();
  set(ref(database, `users/${uid}/orders/${id}`), {
    date: now,
    list: order,
  });
}

export async function getOrders(uid) {
  return get(ref(database, `users/${uid}/orders`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        return null;
      }
    })
    .catch(console.error);
}

export async function getProfile(uid) {
  return get(ref(database, `users/${uid}/profile`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        return null;
      }
    })
    .catch(console.error);
}

export async function updateProfile(uid, profile) {
  set(ref(database, `users/${uid}/profile`), profile);
}
