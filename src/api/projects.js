import { request } from '../utils/request.js';

export function getProjects() {
  return request('/api/projects');
}
