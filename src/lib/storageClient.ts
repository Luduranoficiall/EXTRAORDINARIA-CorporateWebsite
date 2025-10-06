export async function uploadFile(path: string, file: File) {
  const form = new FormData();
  form.append('file', file);
  const resp = await fetch(`/storage/upload?path=${encodeURIComponent(path)}`, {
    method: 'POST',
    body: form,
  });
  if (!resp.ok) throw new Error(`Upload failed: ${resp.status}`);
  return resp.json();
}

export async function downloadFile(path: string) {
  const resp = await fetch(`/storage/download?path=${encodeURIComponent(path)}`);
  if (!resp.ok) throw new Error(`Download failed: ${resp.status}`);
  return resp.json();
}

export async function deleteFile(path: string) {
  const resp = await fetch(`/storage/delete?path=${encodeURIComponent(path)}`, { method: 'DELETE' });
  if (!resp.ok) throw new Error(`Delete failed: ${resp.status}`);
  return resp.json();
}
