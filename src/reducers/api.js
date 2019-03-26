import Promise from 'bluebird';

export async function sendFile(id, file) {
  // simulate for now
  const response = await fetch(`/api/convert/${id}`, {
    method: 'POST',
    body: file
  });
  const result = await response.json();
  return result.success === true;
}

export async function getProgress(id) {
  await Promise.delay(1000);
  return {
    status: 'queued'
  }
}
