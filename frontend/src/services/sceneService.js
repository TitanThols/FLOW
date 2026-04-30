import api from './api'

/** Fetch all scenes for the authenticated user */
export const getAllScenes = async () => {
  const res = await api.get('/scenes')
  return res.data
}

/** Create a new scene */
export const createScene = async (data) => {
  const res = await api.post('/scenes', data)
  return res.data
}

/** Delete a scene and all associated assets */
export const deleteScene = async (id) => {
  const res = await api.delete(`/scenes/${id}`)
  return res.data
}
