import { request } from '../utils/request.js';

export function postMessage(payload) {
  return request('/api/message', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}
