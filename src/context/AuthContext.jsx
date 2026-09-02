import { createContext, useContext, useEffect, useState } from 'react'
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut
} from 'firebase/auth'
import { auth } from '../lib/firebase'

const AuthContext = createContext(null)

// Traduce los códigos de error de Firebase Auth a algo legible.
// No cubre todos los casos — para lo que no está mapeado, muestra un genérico.
const ERROR_MESSAGES = {
  'auth/invalid-email': 'El email no es válido.',
  'auth/user-not-found': 'No hay ninguna cuenta con ese email.',
  'auth/wrong-password': 'La contraseña es incorrecta.',
  'auth/invalid-credential': 'Email o contraseña incorrectos.',
  'auth/email-already-in-use': 'Ya existe una cuenta con ese email.',
  'auth/weak-password': 'La contraseña tiene que tener al menos 6 caracteres.',
  'auth/popup-closed-by-user': 'Cerraste la ventana antes de terminar.'
}

function friendlyError(err) {
  return ERROR_MESSAGES[err?.code] || 'Algo salió mal. Probá de nuevo.'
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!auth) {
      // Firebase Auth no inicializó (ver lib/firebase.js) — la app sigue
      // andando como si nadie estuviera logueado, en vez de romperse.
      setLoading(false)
      return
    }
    const unsub = onAuthStateChanged(auth, async (u) => {
      setUser(u)
      if (u) {
        // El custom claim "admin" se asigna con scripts/set-admin.js — no
        // se puede setear desde el cliente, así que es seguro confiar en él.
        const token = await u.getIdTokenResult()
        setIsAdmin(token.claims.admin === true)
      } else {
        setIsAdmin(false)
      }
      setLoading(false)
    })
    return unsub
  }, [])

  async function signInWithGoogle() {
    if (!auth) return { ok: false, error: 'El login no está disponible ahora mismo.' }
    try {
      await signInWithPopup(auth, new GoogleAuthProvider())
      return { ok: true }
    } catch (err) {
      return { ok: false, error: friendlyError(err) }
    }
  }

  async function signInWithEmail(email, password) {
    if (!auth) return { ok: false, error: 'El login no está disponible ahora mismo.' }
    try {
      await signInWithEmailAndPassword(auth, email, password)
      return { ok: true }
    } catch (err) {
      return { ok: false, error: friendlyError(err) }
    }
  }

  async function registerWithEmail(email, password) {
    if (!auth) return { ok: false, error: 'El login no está disponible ahora mismo.' }
    try {
      await createUserWithEmailAndPassword(auth, email, password)
      return { ok: true }
    } catch (err) {
      return { ok: false, error: friendlyError(err) }
    }
  }

  async function signOut() {
    if (!auth) return
    await firebaseSignOut(auth)
  }

  const value = { user, isAdmin, loading, signInWithGoogle, signInWithEmail, registerWithEmail, signOut }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth debe usarse dentro de <AuthProvider>')
  return ctx
}
