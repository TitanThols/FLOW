import { useState, useEffect } from 'react'
import Dock from '../components/Dock'
import styles from './Dashboard.module.css'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { getAllScenes, createScene, deleteScene } from '../services/sceneService'
import { getAllAssets, createAsset, updateAsset, deleteAsset } from '../services/assetService'
import { getAllUsers } from '../services/userService'
import { Trash2, Plus, X, AlertCircle } from 'lucide-react'

const STAGES = ['Concept', 'Modeling', 'Texturing', 'Rendering', 'Final Output']
const STAGE_MAP = {
  'Concept': { color: 'var(--stage-concept)', tag: 'CNPT' },
  'Modeling': { color: 'var(--stage-modeling)', tag: 'MODL' },
  'Texturing': { color: 'var(--stage-texturing)', tag: 'TXTR' },
  'Rendering': { color: 'var(--stage-rendering)', tag: 'RNDR' },
  'Final Output': { color: 'var(--stage-final)', tag: 'FNLO' },
}

function pad(n) { return String(n).padStart(2, '0') }
function shortId(id = '') { return id.toString().slice(-6).toUpperCase() }
function userTag(name = '') {
  const parts = name.trim().split(' ')
  if (parts.length >= 2) return `${parts[0].charAt(0)}.${parts[parts.length - 1]}`.toUpperCase()
  return name.toUpperCase().slice(0, 6)
}

export default function Dashboard() {
  const { user, logoutUser } = useAuth()
  const navigate = useNavigate()

  const [activeTab, setActiveTab] = useState('assets')
  const [assets, setAssets] = useState([])
  const [scenes, setScenes] = useState([])
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [showAssetModal, setShowAssetModal] = useState(false)
  const [assetName, setAssetName] = useState('')
  const [assetScene, setAssetScene] = useState('')
  const [assetPriority, setAssetPriority] = useState('medium')
  const [assetDueDate, setAssetDueDate] = useState('')
  const [assetAssignee, setAssetAssignee] = useState('')

  const [showSceneModal, setShowSceneModal] = useState(false)
  const [sceneName, setSceneName] = useState('')
  const [sceneDesc, setSceneDesc] = useState('')

  useEffect(() => { fetchData() }, [])

  async function fetchData() {
    try {
      setLoading(true); setError('')
      const [sRes, uRes] = await Promise.all([getAllScenes(), getAllUsers()])
      const sc = sRes.data.scenes || []
      setScenes(sc)
      setUsers(uRes.data.users || [])
      if (sc.length > 0) {
        const r = await Promise.all(sc.map(s => getAllAssets(s._id)))
        setAssets(r.flatMap(x => x.data.assets || []))
      } else { setAssets([]) }
    } catch { setError('SYS_ERR: PIPELINE_LOAD_FAILED') }
    finally { setLoading(false) }
  }

  async function handleCreateAsset(e) {
    e.preventDefault()
    try {
      setError('')
      await createAsset({ title: assetName, sceneId: assetScene, priority: assetPriority, dueDate: assetDueDate || undefined, assignedTo: assetAssignee || undefined })
      setShowAssetModal(false); setAssetName(''); setAssetScene(''); setAssetPriority('medium'); setAssetDueDate(''); setAssetAssignee('')
      fetchData()
    } catch (err) { setError(err.response?.data?.message || 'ASSET_REG_FAILED') }
  }

  async function handleCreateScene(e) {
    e.preventDefault()
    try {
      setError('')
      await createScene({ name: sceneName, description: sceneDesc })
      setShowSceneModal(false); setSceneName(''); setSceneDesc('')
      fetchData()
    } catch (err) { setError(err.response?.data?.message || 'SCENE_INIT_FAILED') }
  }

  async function handleDeleteAsset(id) {
    if (!window.confirm('CONFIRM: DECOMMISSION ASSET?')) return
    try { setError(''); await deleteAsset(id); fetchData() }
    catch (err) { setError(err.response?.data?.message || 'DEL_FAILED') }
  }

  async function handleDeleteScene(id) {
    if (!window.confirm('CONFIRM: TERMINATE SCENE + ALL LINKED ASSETS?')) return
    try { setError(''); await deleteScene(id); fetchData() }
    catch (err) { setError(err.response?.data?.message || 'DEL_FAILED') }
  }

  async function handleStageChange(id, status) {
    try { setError(''); await updateAsset(id, { status }); fetchData() }
    catch (err) { setError(err.response?.data?.message || 'STAGE_UPDATE_FAILED') }
  }

  function handleLogout() { logoutUser(); navigate('/') }
  function isOverdue(d) { return d ? new Date(d) < new Date() : false }
  function getAssetCount(sid) { return assets.filter(a => a.sceneId?._id === sid).length }

  const completedCount = assets.filter(a => a.status === 'Final Output').length

  if (loading) {
    return (
      <div className={styles.loadingScreen}>
        <span className={styles.loadingText}>&gt;_ INITIALIZING PIPELINE<span className={styles.blink}>_</span></span>
      </div>
    )
  }

  return (
    <div className={styles.layout}>
      <Dock activeTab={activeTab} onTabChange={setActiveTab} onLogout={handleLogout} />

      <main className={styles.main}>
        <header className={styles.header}>
          <div>
            <div className={styles.headerLabel}>
              {activeTab === 'assets' ? 'ASSET_PIPELINE' : 'SCENE_LIBRARY'}
            </div>
            <h1 className={styles.headerTitle}>
              {activeTab === 'assets' ? 'Pipeline' : 'Scenes'}
            </h1>
          </div>
          <button className={styles.addBtn} onClick={() => activeTab === 'assets' ? setShowAssetModal(true) : setShowSceneModal(true)}>
            <Plus size={13} strokeWidth={2.5} />
            <span>{activeTab === 'assets' ? 'REG_ASSET' : 'INIT_SCENE'}</span>
          </button>
        </header>

        {error && (
          <div className={styles.errBar} role="alert">
            <AlertCircle size={12} />
            <span>{error}</span>
            <button onClick={() => setError('')}><X size={11} /></button>
          </div>
        )}
        <div className={styles.metrics}>
          <div className={styles.metricCard}>
            <span className={styles.metricBg}>{pad(scenes.length)}</span>
            <div className={styles.metricContent}>
              <span className={styles.metricLabel}>SCENES</span>
              <span className={styles.metricVal}>[ CAP: {pad(scenes.length)} / 50 ]</span>
            </div>
          </div>
          <div className={styles.metricCard}>
            <span className={styles.metricBg}>{pad(assets.length)}</span>
            <div className={styles.metricContent}>
              <span className={styles.metricLabel}>ASSETS</span>
              <span className={styles.metricVal}>[ CAP: {pad(assets.length)} / 99 ]</span>
            </div>
          </div>
          <div className={`${styles.metricCard} ${styles.metricCardAccent}`}>
            <span className={styles.metricBg}>{pad(completedCount)}</span>
            <div className={styles.metricContent}>
              <span className={styles.metricLabel}>FINAL_OUT</span>
              <span className={styles.metricVal}>[ RDY: {pad(completedCount)} / {pad(assets.length)} ]</span>
            </div>
          </div>
        </div>

        {/* Assets */}
        {activeTab === 'assets' && (
          <section className={styles.section}>
            {assets.length === 0 ? (
              <div className={styles.empty}>
                <span className={styles.emptyText}>&gt;_ NO ASSETS IN PIPELINE</span>
                <span className={styles.emptyHint}>Register a 3D asset to begin tracking.</span>
              </div>
            ) : (
              <div className={styles.grid}>
                {assets.map(asset => {
                  const stg = STAGE_MAP[asset.status] || STAGE_MAP['Concept']
                  const overdue = isOverdue(asset.dueDate) && asset.status !== 'Final Output'
                  return (
                    <div key={asset._id} className={`${styles.card} ${overdue ? styles.cardOverdue : ''}`}>
                      <div className={styles.cardTop}>
                        <span className={styles.cardId}>#{shortId(asset._id)}</span>
                        <span className={styles.cardPriority} data-p={asset.priority}>
                          {asset.priority === 'high' ? '▲ HI' : asset.priority === 'medium' ? '● MD' : '▽ LO'}
                        </span>
                      </div>
                      <h3 className={styles.cardTitle}>{asset.title}</h3>

                      {asset.assignedTo && (
                        <div className={styles.memberTag}>
                          [USR: {userTag(asset.assignedTo.name)}]
                        </div>
                      )}

                      {asset.sceneId && (
                        <div className={styles.sceneBadge}>&gt;_SCN/{asset.sceneId.name}</div>
                      )}

                      {asset.dueDate && (
                        <div className={`${styles.dateBadge} ${overdue ? styles.dateOverdue : ''}`}>
                          DUE: {new Date(asset.dueDate).toLocaleDateString('en-US', { month: 'short', day: '2-digit' })}
                        </div>
                      )}

                      <div className={styles.cardBottom}>
                        <select
                          className={styles.stageSelect}
                          value={asset.status}
                          onChange={e => handleStageChange(asset._id, e.target.value)}
                          style={{ color: stg.color }}
                        >
                          {STAGES.map(s => <option key={s} value={s}>{STAGE_MAP[s].tag}</option>)}
                        </select>
                        <button className={styles.delBtn} onClick={() => handleDeleteAsset(asset._id)}>
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </section>
        )}

        {activeTab === 'scenes' && (
          <section className={styles.section}>
            {scenes.length === 0 ? (
              <div className={styles.empty}>
                <span className={styles.emptyText}>&gt;_ NO SCENES INITIALIZED</span>
                <span className={styles.emptyHint}>Create a 3D environment to start building.</span>
              </div>
            ) : (
              <div className={styles.grid}>
                {scenes.map(scene => (
                  <div key={scene._id} className={styles.card}>
                    <div className={styles.cardTop}>
                      <span className={styles.cardId}>#{shortId(scene._id)}</span>
                      <button className={styles.delBtn} onClick={() => handleDeleteScene(scene._id)}>
                        <Trash2 size={12} />
                      </button>
                    </div>
                    <h3 className={styles.cardTitle}>{scene.name}</h3>
                    {scene.description && <p className={styles.cardDesc}>{scene.description}</p>}
                    <div className={styles.cardMeta}>
                      {scene.createdBy && <div className={styles.memberTag}>[USR: {userTag(scene.createdBy.name)}]</div>}
                      <span className={styles.sceneBadge}>&gt;_ASSETS: {pad(getAssetCount(scene._id))}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}
      </main>

      {showAssetModal && (
        <div className={styles.overlay} onClick={() => setShowAssetModal(false)}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <div className={styles.modalHead}>
              <span className={styles.modalLabel}>// REGISTER_ASSET</span>
              <button onClick={() => setShowAssetModal(false)}><X size={14} /></button>
            </div>
            <form onSubmit={handleCreateAsset} className={styles.form}>
              <div className={styles.field}>
                <label className={styles.fLabel}>TITLE</label>
                <input className={styles.fInput} placeholder="Main_Character_Mesh" value={assetName} onChange={e => setAssetName(e.target.value)} required />
              </div>
              <div className={styles.field}>
                <label className={styles.fLabel}>SCENE</label>
                <select className={styles.fInput} value={assetScene} onChange={e => setAssetScene(e.target.value)} required>
                  <option value="">-- SELECT --</option>
                  {scenes.map(s => <option key={s._id} value={s._id}>{s.name}</option>)}
                </select>
              </div>
              <div className={styles.field}>
                <label className={styles.fLabel}>ASSIGN_TO</label>
                <select className={styles.fInput} value={assetAssignee} onChange={e => setAssetAssignee(e.target.value)}>
                  <option value="">-- NONE --</option>
                  {users.map(u => <option key={u._id} value={u._id}>{u.name}</option>)}
                </select>
              </div>
              <div className={styles.formRow}>
                <div className={styles.field}>
                  <label className={styles.fLabel}>PRIORITY</label>
                  <select className={styles.fInput} value={assetPriority} onChange={e => setAssetPriority(e.target.value)}>
                    <option value="low">LOW</option>
                    <option value="medium">MEDIUM</option>
                    <option value="high">HIGH</option>
                  </select>
                </div>
                <div className={styles.field}>
                  <label className={styles.fLabel}>DUE_DATE</label>
                  <input className={styles.fInput} type="date" value={assetDueDate} onChange={e => setAssetDueDate(e.target.value)} />
                </div>
              </div>
              <button type="submit" className={styles.submitBtn}>REGISTER →</button>
            </form>
          </div>
        </div>
      )}

      {showSceneModal && (
        <div className={styles.overlay} onClick={() => setShowSceneModal(false)}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <div className={styles.modalHead}>
              <span className={styles.modalLabel}>// INIT_SCENE</span>
              <button onClick={() => setShowSceneModal(false)}><X size={14} /></button>
            </div>
            <form onSubmit={handleCreateScene} className={styles.form}>
              <div className={styles.field}>
                <label className={styles.fLabel}>NAME</label>
                <input className={styles.fInput} placeholder="Cyberpunk_Cityscape" value={sceneName} onChange={e => setSceneName(e.target.value)} required />
              </div>
              <div className={styles.field}>
                <label className={styles.fLabel}>DESC</label>
                <input className={styles.fInput} placeholder="Optional description" value={sceneDesc} onChange={e => setSceneDesc(e.target.value)} />
              </div>
              <button type="submit" className={styles.submitBtn}>INITIALIZE →</button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}