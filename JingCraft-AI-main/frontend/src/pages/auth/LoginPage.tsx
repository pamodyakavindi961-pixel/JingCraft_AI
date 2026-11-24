import { useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { login, register } from '../../api'

function LoginPage() {
  const navigate = useNavigate()
  const [mode, setMode] = useState<'login' | 'register'>('login')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setError('')
    setLoading(true)
    try {
      if (mode === 'register') {
        await register(name, email, password)
      } else {
        await login(email, password)
      }
      navigate('/design-studio')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  const inputClass =
    'w-full rounded-xl border border-[#DED9CE] bg-white px-4 py-3 text-sm text-[#344451] outline-none transition placeholder:text-[#B0ACA3] focus:border-[#66877A] focus:ring-2 focus:ring-[#66877A]/10'

  return (
    <section className="mx-auto flex max-w-md flex-col px-6 py-20">
      <h1 className="text-3xl font-semibold text-[#193C67]">
        {mode === 'login' ? 'Welcome back' : 'Create your account'}
      </h1>
      <p className="mt-2 text-sm text-[#747B84]">
        {mode === 'login'
          ? 'Log in to save and manage your ceramic designs.'
          : 'Register to save your designs to your own account.'}
      </p >

      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        {mode === 'register' && (
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            required
            className={inputClass}
          />
        )}
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          className={inputClass}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password (at least 8 characters)"
          required
          minLength={8}
          className={inputClass}
        />

        {error && (
          <p role="alert" className="rounded-lg bg-[#F7EEEA] px-4 py-3 text-sm text-[#8A4438]">
            {error}
          </p >
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-full bg-[#193C67] px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-[#244E68] disabled:cursor-wait disabled:opacity-70"
        >
          {loading ? 'Please wait…' : mode === 'login' ? 'Log in' : 'Register'}
        </button>
      </form>

      <button
        type="button"
        onClick={() => {
          setMode(mode === 'login' ? 'register' : 'login')
          setError('')
        }}
        className="mt-6 text-sm font-medium text-[#193C67] underline-offset-4 hover:underline"
      >
        {mode === 'login'
          ? "Don't have an account? Register"
          : 'Already have an account? Log in'}
      </button>
    </section>
  )
}

export default LoginPage