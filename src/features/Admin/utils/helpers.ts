import { accessDatabase } from '@/api';

export const confirmChoice = (callback: CallableFunction) => {
  if (confirm('Are you sure?')) return callback();
};

export const approveProvider = (
  id: number,
  endpoint: 'providers' | 'organizations'
) => {
  accessDatabase('PATCH', endpoint, {
    id,
    body: { general: { needs_review: false } }
  });
};
