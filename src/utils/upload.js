import axios from 'axios'
import { getToken } from '@/utils/auth'
import generateToken from '@/utils/tokenGenerator'

export function upload(api, file) {
  var data = new FormData()
  data.append('file', file)
  const config = {
    headers: {
      'token': getToken(),
      'uuid': generateToken(),
      'key': 'adaptivecloud.org'
    }
  }
  return axios.post(`${api}?name=${file.name}`, data, config)
}
