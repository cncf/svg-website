import Promise from 'bluebird';

export async function sendFile(id, file) {
  // simulate for now
  try {
    const response = await fetch(`/api/convert/${id}`, {
      method: 'POST',
      body: file
    });
    const result = await response.json();
    return result.success === true;
  } catch(ex) {
    console.info(ex);
    return false;
  }
}

export async function getProgress(id) {
  await Promise.delay(1000);
  return {
    status: 'queued'
  }
}
