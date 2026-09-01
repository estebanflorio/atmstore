import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Button } from '../components/ui/Button'

export function Login() {
  const { signInWithGoogle, signInWithEmail, registerWithEmail } = useAuth()
  const navigate = useNavigate()

  const [mode, setMode] = useState('login') // 'login' | 'register'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    const action = mode === 'login' ? signInWithEmail : registerWithEmail
    const result = await action(email, password)
    setLoading(false)
    if (result.ok) navigate('/mis-compras')
    else setError(result.error)
  }

  async function handleGoogle() {
    setError('')
    setLoading(true)
    const result = await signInWithGoogle()
    setLoading(false)
    if (result.ok) navigate('/mis-compras')
    else setError(result.error)
  }

  return (
    <div className="max-w-sm mx-auto">
      <h1 className="font-display text-2xl mb-1">
        {mode === 'login' ? 'Ingresar' : 'Crear cuenta'}
      </h1>
      <p className="text-paper/60 text-sm mb-6">
        {mode === 'login'
          ? 'Para ver el historial de tus compras.'
          : 'Vas a poder ver acá tus compras futuras — no hace falta para comprar.'}
      </p>

      <button
        onClick={handleGoogle}
        disabled={loading}
        className="w-full border border-line py-2.5 text-sm mb-4 hover:border-lime transition-colors disabled:opacity-40"
      >
        Continuar con Google
      </button>

      <div className="flex items-center gap-3 text-paper/30 text-xs mb-4">
        <div className="flex-1 h-px bg-line" />
        o con email
        <div className="flex-1 h-px bg-line" />
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="email"
          required
          placeholder="tu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2.5 border border-line bg-surface text-paper text-sm placeholder:text-violet focus:outline-none focus:border-lime"
        />
        <input
          type="password"
          required
          minLength={6}
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2.5 border border-line bg-surface text-paper text-sm placeholder:text-violet focus:outline-none focus:border-lime"
        />

        {error && <p className="text-lime text-xs">{error}</p>}

        <Button type="submit" disabled={loading} className="w-full">
          {loading ? 'Un momento…' : mode === 'login' ? 'Ingresar' : 'Crear cuenta'}
        </Button>
      </form>

      <button
        onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setError('') }}
        className="text-paper/60 text-xs mt-4 hover:text-lime underline"
      >
        {mode === 'login' ? '¿No tenés cuenta? Creá una' : '¿Ya tenés cuenta? Ingresá'}
      </button>

      <Link to="/" className="block text-paper/40 text-xs mt-6 hover:text-lime">
        ← Volver al catálogo
      </Link>
    </div>
  )
}
