import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import styles from './LandingPage.module.css'

const STAGES = ['Concept', 'Modeling', 'Texturing', 'Rendering', 'Final Output']
const FEATURES = [
  { tag: 'SCN', title: 'Scene Management', desc: 'Organize 3D environments. Track every scene from concept to final output.' },
  { tag: 'AST', title: 'Asset Pipeline', desc: 'Register meshes, textures, rigs. Know where every asset sits in the pipeline.' },
  { tag: 'STG', title: 'Pipeline Stages', desc: 'Move assets through 5 production stages with single-click stage transitions.' },
  { tag: 'USR', title: 'Team Assign', desc: 'Assign assets to artists. See who owns what across every scene.' },
]

export default function LandingPage() {
  const navigate = useNavigate()
  return (
    <div className={styles.page}>
      <div className={styles.bgGrid} aria-hidden="true">
        {/* Animated SVG shapes for excitement */}
        <svg className={styles.bgShapes} width="100%" height="100%" viewBox="0 0 1440 800" fill="none" xmlns="http://www.w3.org/2000/svg" style={{position:'absolute',top:0,left:0,width:'100%',height:'100%'}}>
          <circle cx="200" cy="200" r="80" fill="#00ff99" opacity="0.13" style={{animation:'float 6s ease-in-out infinite'}} />
          <rect x="1100" y="120" width="120" height="120" rx="32" fill="#00c3ff" opacity="0.10" style={{animation:'float 7s 1s ease-in-out infinite'}} />
          <ellipse cx="900" cy="600" rx="90" ry="40" fill="#fff" opacity="0.07" style={{animation:'float 8s 0.5s ease-in-out infinite'}} />
        </svg>
      </div>

      <header className={styles.header}>
        <span className={styles.logo}>FL<span className={styles.logoAccent}>OW</span></span>
        <nav className={styles.headerNav}>
          <button className={styles.ghostBtn} onClick={() => navigate('/login')}>Sign In</button>
          <button className={styles.accentBtn} onClick={() => navigate('/signup')}>Get Access →</button>
        </nav>
      </header>

      <section className={styles.hero}>
        <div className={styles.badge}>
          <span className={styles.badgeDot} />
          <span className={styles.badgeText}>3D PIPELINE TRACKER</span>
        </div>
        <h1 className={styles.heroTitle}>Your 3D Pipeline.<br /><span className={styles.heroAccent}>Stripped Raw.</span></h1>
        <p className={styles.heroSub}>Flow speaks the language of 3D artists — scenes, assets, and production pipelines.</p>
        <div className={styles.heroCtas}>
          <button className={styles.accentBtnLg} onClick={() => navigate('/signup')}>INITIALIZE <ArrowRight size={14} /></button>
          <button className={styles.ghostBtnLg} onClick={() => navigate('/login')}>AUTHENTICATE</button>
        </div>
        <div className={styles.stageStrip}>
          {STAGES.map((s, i) => (
            <span key={s} className={styles.stageChip}><span className={styles.stageNum}>{String(i + 1).padStart(2, '0')}</span>{s}</span>
          ))}
        </div>
      </section>

      <section className={styles.features}>
        <span className={styles.sectionLabel}>CAPABILITIES</span>
        <div className={styles.featureGrid}>
          {FEATURES.map(f => (
            <div key={f.tag} className={styles.featureCard}>
              <div className={styles.featureTop}><span className={styles.featureTag}>[{f.tag}]</span></div>
              <h3 className={styles.featureTitle}>{f.title}</h3>
              <p className={styles.featureDesc}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className={styles.footer}>
        <span className={styles.footerLogo}>FL<span style={{ color: 'var(--accent)' }}>OW</span></span>
        <span className={styles.footerCopy}>© 2026 Flow. All rights reserved.</span>
      </footer>
    </div>
  )
}