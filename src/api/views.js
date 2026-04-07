import { request } from '../utils/request.js';

export function incrementViews() {
  return request('/api/views');
}
