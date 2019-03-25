import Promise from 'bluebird';
export async function sendFile(id, file) {
  // simulate for now
  await Promise.delay(2000);
}
export async function getProgress(id) {
  await Promise.delay(1000);
  return {
    status: 'queued'
  }
}
