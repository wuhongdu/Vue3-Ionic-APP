import request from '@/utils/request';

export function getDevice(params: any) {
  return request({
    url: '/get_device',
    method: 'post',
    data: params
  });
}

export function addDevice(params: any) {
  return request({
    url: '/add_device',
    method: 'post',
    data: params
  });
}

export function delDevice(params: any) {
  return request({
    url: '/delete_device',
    method: 'post',
    data: params
  });
}

export function changeNickname(params: any) {
  return request({
    url: '/change_nickname',
    method: 'post',
    data: params
  });
}
