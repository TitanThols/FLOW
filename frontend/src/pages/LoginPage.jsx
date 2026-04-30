import { useState } from 'react'
import { AlertCircle } from 'lucide-react'
import styles from './LoginPage.module.css'
import { login } from '../services/authService'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { loginUser } = useAuth()
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault(); setError(''); setLoading(true)
    try {
      const data = await login(email, password)
      loginUser(data); navigate('/dashboard')
    } catch (err) {
      const d = err.response?.data
      setError(d?.errors?.[0] || d?.message || 'AUTH_FAILED')
    } finally { setLoading(false) }
  }

  return (
    <div className={styles.page}>
      <div className={styles.bgGrid} aria-hidden="true" />
      <div className={styles.container}>
        <span className={styles.logo}>FL<span className={styles.logoAccent}>OW</span></span>
        <div className={styles.card}>
          <div className={styles.cardHead}>
            <span className={styles.cardLabel}>AUTHENTICATE</span>
            <p className={styles.cardSub}>Access your pipeline.</p>
          </div>
          {error && <div className={styles.err}><AlertCircle size={12} /><span>{error}</span></div>}
          <form onSubmit={handleSubmit} className={styles.form} noValidate>
            <div className={styles.field}><label className={styles.fLabel}>EMAIL</label><input className={styles.fInput} type="email" placeholder="tholkappian@studio.com" value={email} onChange={e => setEmail(e.target.value)} required /></div>
            <div className={styles.field}><label className={styles.fLabel}>ACCESS_KEY</label><input className={styles.fInput} type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} required /></div>
            <button type="submit" className={styles.submitBtn} disabled={loading}>{loading ? '>_ AUTHENTICATING...' : 'AUTHENTICATE →'}</button>
          </form>
          <p className={styles.switch}>New to Flow? <span className={styles.link} onClick={() => navigate('/signup')}>INIT_CREDENTIALS</span></p>
        </div>
        <span className={styles.footerMono}>© 2026 Flow</span>
      </div>
    </div>
  )
}