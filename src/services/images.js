
import axios from 'axios'
const baseUrl = '/api/images'

const getAllImages = () => {
  const request = axios.get(baseUrl)
  return request
}

export default getAllImages