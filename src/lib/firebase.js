import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import { getAuth } from 'firebase/auth'

// Todas las claves salen de variables de entorno — ver .env.example.
// Son públicas por diseño (así funciona el SDK cliente de Firebase);
// la seguridad real la ponen las Firestore/Storage rules, no estas keys.
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
}

export const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const storage = getStorage(app)

// getAuth() puede fallar si las credenciales están mal cargadas o falta el
// .env — no dejamos que eso tire abajo toda la tienda (el catálogo y el
// checkout como invitado no dependen de Auth). AuthContext maneja `auth`
// en null mostrando la app como si nadie estuviera logueado.
export let auth = null
try {
  auth = getAuth(app)
} catch (err) {
  console.error('Firebase Auth no pudo inicializarse:', err)
}
