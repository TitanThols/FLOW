import { useState } from 'react'
import { AlertCircle } from 'lucide-react'
import styles from './SignupPage.module.css'
import { useNavigate } from 'react-router-dom'
import { signup } from '../services/authService'
import { useAuth } from '../context/AuthContext'

export default function SignupPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { loginUser } = useAuth()
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault(); setError('')
    if (password !== confirmPassword) { setError('ACCESS_KEYS_MISMATCH'); return }
    setLoading(true)
    try {
      const data = await signup(name, email, password, confirmPassword)
      loginUser(data); navigate('/dashboard')
    } catch (err) {
      const d = err.response?.data
      setError(d?.errors?.[0] || d?.message || 'INIT_FAILED')
    } finally { setLoading(false) }
  }

  return (
    <div className={styles.page}>
      <div className={styles.bgGrid} aria-hidden="true" />
      <div className={styles.container}>
        <span className={styles.logo}>FL<span className={styles.logoAccent}>OW</span></span>
        <div className={styles.card}>
          <div className={styles.cardHead}>
            <span className={styles.cardLabel}>// INIT_CREDENTIALS</span>
            <p className={styles.cardSub}>Join the pipeline.</p>
          </div>
          {error && <div className={styles.err}><AlertCircle size={12} /><span>{error}</span></div>}
          <form onSubmit={handleSubmit} className={styles.form} noValidate>
            <div className={styles.field}><label className={styles.fLabel}>DISPLAY_NAME</label><input className={styles.fInput} type="text" placeholder="Tholkappian" value={name} onChange={e => setName(e.target.value)} required /></div>
            <div className={styles.field}><label className={styles.fLabel}>EMAIL</label><input className={styles.fInput} type="email" placeholder="tholkappian@studio.com" value={email} onChange={e => setEmail(e.target.value)} required /></div>
            <div className={styles.field}><label className={styles.fLabel}>ACCESS_KEY</label><input className={styles.fInput} type="password" placeholder="Min. 8 characters" value={password} onChange={e => setPassword(e.target.value)} required /></div>
            <div className={styles.field}><label className={styles.fLabel}>CONFIRM_KEY</label><input className={styles.fInput} type="password" placeholder="Re-enter key" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required /></div>
            <button type="submit" className={styles.submitBtn} disabled={loading}>{loading ? '>_ INITIALIZING...' : 'INITIALIZE →'}</button>
          </form>
          <p className={styles.switch}>Already in the pipeline? <span className={styles.link} onClick={() => navigate('/login')}>AUTHENTICATE</span></p>
        </div>
        <span className={styles.footerMono}>© 2026 Flow</span>
      </div>
    </div>
  )
}