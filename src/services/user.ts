import request from '@/utils/request';

export function login(params: any) {
  return request({
    url: '/login',
    method: 'post',
    data: params
  });
}

export function register(params: any) {
  return request({
    url: '/register',
    method: 'post',
    data: params
  });
}

export function changeInfo(params: any) {
  return request({
    url: '/changeInfo',
    method: 'post',
    data: params
  });
}
