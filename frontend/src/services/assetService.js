import api from './api'

// ─────────────────────────────────────────────────────────────────────────────
// Asset Service
// Handles all API calls for 3D Asset pipeline management.
// Base: /api/v1/assets
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Fetch all assets for a given scene.
 * @param {string} sceneId - Scene ObjectId
 */
export const getAllAssets = async (sceneId) => {
  const res = await api.get(`/assets?sceneId=${sceneId}`)
  return res.data
}

/**
 * Create a new 3D asset within a scene.
 * @param {{ title: string, sceneId: string, status?: string, priority?: string, assignedTo?: string, dueDate?: string }} data
 */
export const createAsset = async (data) => {
  const res = await api.post('/assets', data)
  return res.data
}

/**
 * Update an asset's pipeline stage, priority, assignee, or due date.
 * @param {string} id   - Asset ObjectId
 * @param {object} data - Partial asset fields to update
 */
export const updateAsset = async (id, data) => {
  const res = await api.patch(`/assets/${id}`, data)
  return res.data
}

/**
 * Remove an asset from the pipeline.
 * @param {string} id - Asset ObjectId
 */
export const deleteAsset = async (id) => {
  const res = await api.delete(`/assets/${id}`)
  return res.data
}
