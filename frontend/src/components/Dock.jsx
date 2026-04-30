import styles from './Dock.module.css'
import { LayoutGrid, Layers, Box, LogOut } from 'lucide-react'

const ITEMS = [
  { id: 'assets',  icon: LayoutGrid, label: 'Pipeline' },
  { id: 'scenes',  icon: Layers,     label: 'Scenes' },
]

export default function Dock({ activeTab, onTabChange, onLogout }) {
  return (
    <nav className={styles.dock} role="navigation" aria-label="Main navigation">
      <div className={styles.dockInner}>
        {/* Logo */}
        <div className={styles.brand}>
          <span className={styles.brandText}>FL<span className={styles.brandAccent}>OW</span></span>
        </div>

        <div className={styles.divider} />

        {ITEMS.map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            className={`${styles.item} ${activeTab === id ? styles.active : ''}`}
            onClick={() => onTabChange(id)}
            title={label}
            aria-current={activeTab === id ? 'page' : undefined}
          >
            <Icon size={16} strokeWidth={activeTab === id ? 2.5 : 1.5} />
            <span className={styles.itemLabel}>{label}</span>
          </button>
        ))}

        <div className={styles.divider} />

        {/* Logout */}
        <button className={styles.item} onClick={onLogout} title="Disconnect">
          <LogOut size={14} strokeWidth={1.5} />
        </button>
      </div>
    </nav>
  )
}
