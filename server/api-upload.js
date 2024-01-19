import { URL_BASE } from './url';

export async function postFile(formData) {
  const response = await fetch(`${URL_BASE}files/up`, {
    method: 'POST',
    body: formData,
  });
  const data = await response.json();
  return data;
}