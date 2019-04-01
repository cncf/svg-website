import Promise from 'bluebird';

export async function sendFile({id, inputFile}) {
  // simulate for now
  try {
    const response = await fetch(`/api/convert/${id}`, {
      method: 'POST',
      body: inputFile
    });
    const result = await response.json();
    return result.success === true;
  } catch(ex) {
    console.info(ex);
    return false;
  }
}

export async function getProgress(id) {
  try {
    const response = await fetch(`/api/convert/${id}`);
    const result = await response.json();
    return result;
  } catch(ex) {
    console.info(ex);
    return { status: 'failed' };
  }
}

export function download({content, fileName}) {
  var encodedContent =  'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(content);
  const link = document.createElement('a');
  link.setAttribute('href', encodedContent);
  link.setAttribute('download', fileName);
  link.click();
}
