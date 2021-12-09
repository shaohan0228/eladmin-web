import request from '@/utils/request'
// eslint-disable-next-line no-unused-vars
import generateToken from '@/utils/tokenGenerator'

export function login(username, password, code, uuid) {
  return request({
    url: 'members/sysUserLogin',
    method: 'post',
    data: {
      uuid: 'VG3OQ81wtrNGANeuq8IdwTBhgkAF53lFOIY6aCIBeo0=',
      loginname: username,
      password: password,
      key: 'adaptivecloud.org'
    }
  })
}

export function getInfo() {
  return request({
    url: 'members/getSysUserInfoByUserId',
    method: 'post'
  })
}

export function getCodeImg() {
  return request({
    url: 'auth/code',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: 'members/Logout',
    method: 'post'
  })
}
